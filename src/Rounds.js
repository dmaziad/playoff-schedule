import React from "react";
import uniqid from "uniqid";
import Game from './Game'

const Rounds = ({ round, width, view }) => (
  <div className="round" key={uniqid('round-')}>
    <h2>{round.seriesName}</h2>
    {round.games.map(game => {
      return <Game game={game} date={game.gameDate} view={view} key={game.gamePk} width={width} />;
    })}
  </div>
);

export default Rounds;