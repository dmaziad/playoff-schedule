import React from "react";
import GameDate from "./GameDate";
import Rounds from "./Rounds";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("schedule mounting with props: ", this.props);
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
              return <Rounds round={round} />;
            })}
      </div>
    );
  }
}
export default Schedule;
