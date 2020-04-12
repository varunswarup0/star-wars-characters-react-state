import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import endpoint from './endpoint';

import './styles.scss';

const reducer = (state, action) => {
  if (action.type === 'FETCHING') {
    return {
      characters: [],
      loading: true,
      error: null,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      characters: [],
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

const initialState = {
  error: null,
  loading: false,
  characters: [],
};

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = (action) => {
    console.log(action);

    if (isFunction(action)) {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, enhancedDispatch];
};

const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { characters } = state;

  useEffect(() => {}, []);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => {}}>Fetch Characters</button>
          <CharacterList characters={characters} />
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
