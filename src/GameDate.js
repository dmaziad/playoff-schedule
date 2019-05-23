import React from "react";
import moment from "moment";
import GameByDate from "./GameByDate";

class GameDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(this.props.date).format("dddd, MMMM D")
    };
  }

  render() {
    return (
      <div className="date" key={this.props.date}>
        <h3>{this.state.date}</h3>
        {this.props.games.length > 1 ? (
          this.props.games.map(game => {
            return <GameByDate game={game} key={game.gamePk} />;
          })
        ) : (
          <GameByDate
            game={this.props.games[0]}
            key={this.props.games[0].gamePk}
          />
        )}
      </div>
    );
  }
}

export default GameDate;
