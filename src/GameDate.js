import React from "react";
import moment from "moment";
import Game from "./Game";

const GameDate = ({ date, games, width, view }) => {
  return (
    <div className="date" key={date}>
      <h2>{moment(date).format("dddd, MMMM D")}</h2>
      {games.map(game => (
        <Game date={date} view={view} game={game} key={game.gamePk} width={width} />
      ))}
    </div>
  );
};

export default GameDate;
