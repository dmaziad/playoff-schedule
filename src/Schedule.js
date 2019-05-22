import React from "react";
import GameDate from "./GameDate";

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
        {this.props.dates.map(date => {
          return (
            <GameDate key={date} date={date} games={this.props.games[date]} />
          );
        })}
      </div>
    );
  }
}
export default Schedule;
