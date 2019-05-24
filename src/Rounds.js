import React from "react";
// import GameByRound from "./GameByRound";
import uniqid from "uniqid";
import GameByDate from './GameByDate'

const Rounds = ({ round, width, view }) => (
  <div className="round" key={uniqid('round-')}>
    <h2>{round.seriesName}</h2>
    {round.games.map(game => {
      return <GameByDate game={game} date={game.gameDate} view={view} key={game.gamePk} width={width} />;
    })}
  </div>
);

export default Rounds;