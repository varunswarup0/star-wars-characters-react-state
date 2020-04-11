import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import dummyData from './dummy-data';

import './styles.scss';
import endpoint from './endpoint';

const Application = () => {
  const [characters, setCharacters] = useState([]);

  React.useEffect(() => {
    fetch(endpoint + '/characters')
      .then((response) => response.json())
      .then((response) => {
        setCharacters(response.characters);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
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
