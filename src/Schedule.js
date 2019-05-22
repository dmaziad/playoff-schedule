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
          return <GameDate date={date} games={this.props.games[date]} />;
        })}
        <h2>{this.props.date}</h2>
        {/* {this.props.games[date].length > 1 ? (
            this.props.games[date].map(game => {
              return <Game game={game} />;
            })
          ) : (
            <Game game={game} />
          )} */}
      </div>
    );
  }
}
export default Schedule;
