import React from "react";
import GameByRound from "./GameByRound";

const Rounds = props => (
  <div className="round" key={props.round.games[0].seriesStatus.shortName}>
    <h3>{props.round.games[0].seriesStatus.shortName}</h3>
    {props.round.games.length > 1 ? (
      props.round.games.map(game => {
        return <GameByRound game={game} key={game.gamePk} />;
      })
    ) : (
      <GameByRound game={props.round.games[0]} />
    )}
  </div>
);

export default Rounds;
