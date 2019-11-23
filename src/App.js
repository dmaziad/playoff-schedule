import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { getData } from '../lib/fetch.js';
import Options from './Options';
import Schedule from './Schedule';

const App = () => {
  let [view, setView] = useState('byDate');
  let [dates, setDates] = useState([]);
  let [rounds, setRounds] = useState([]);

  useEffect(() => {
    getData().then(data => {
      setDates(data.dates);
      setRounds(data.rounds);
    });
  });

  const toggleView = view => {
    setView(view);
  };

  return (
    <div className="app">
      <div className="heading-bar">
        <h2 className="title">
          <span className="heading">Schedule</span>
        </h2>
      </div>
      <Options toggleView={toggleView} view={view} />
      <Schedule dates={dates} view={view} rounds={rounds} />
    </div>
  );
};

render(<App />, document.getElementById('root'));
