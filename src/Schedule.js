import React from "react";
import GameDate from "./GameDate";
import Rounds from "./Rounds";

const Schedule = props => (
  <div className="schedule">
    {props.view === "byDate"
      ? props.dates.map(date => {
          return <GameDate key={date} date={date} games={props.games[date]} />;
        })
      : props.rounds.map(round => {
          return <Rounds key={round.series.id} round={round} />;
        })}
  </div>
);

export default Schedule;
