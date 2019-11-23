import React, { useState, useEffect } from 'react';
import GameDate from './GameDate';
import Rounds from './Rounds';
import uniqid from 'uniqid';

const Schedule = ({ dates, rounds, view }) => {
  let [width, setWidth] = useState(null);

  const getWidth = () => {
    let windowWidth = document.documentElement.clientWidth;
    setWidth(windowWidth);
  };

  useEffect(() => {
    function listenForWidth() {
      getWidth();
      window.addEventListener('resize', getWidth);
    }

    return function stopListener() {
      window.removeEventListener('resize', getWidth);
    };
  });

  return (
    <div className="schedule">
      {view === 'byDate'
        ? dates.map(date => {
            const games = rounds.reduce((acc, round) => {
              const filteredGames = round.games.filter(game =>
                game.gameDate.includes(date)
              );
              return [...acc, ...filteredGames];
            }, []);
            return (
              <GameDate
                key={date}
                date={date}
                games={games}
                view={view}
                width={width}
              />
            );
          })
        : rounds.map(round => {
            return (
              <Rounds
                key={uniqid(`schedule-`)}
                view={view}
                round={round}
                width={width}
              />
            );
          })}
    </div>
  );
};

export default Schedule;
