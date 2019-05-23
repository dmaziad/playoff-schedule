import React from "react";
import GameDate from "./GameDate";
import Rounds from "./Rounds";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="schedule">
        {this.props.view === "byDate"
          ? this.props.dates.map(date => {
              return (
                <GameDate
                  key={date}
                  date={date}
                  games={this.props.games[date]}
                />
              );
            })
          : this.props.rounds.map(round => {
              return <Rounds key={round.series.id} round={round} />;
            })}
      </div>
    );
  }
}
export default Schedule;
