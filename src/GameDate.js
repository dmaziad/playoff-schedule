import React from "react";
import moment from "moment";
import Game from "./Game";

class GameDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(this.props.date).format("ll")
    };
  }

  componentDidMount() {
    console.log("GameDate props: ", this.props);
  }
  render() {
    return (
      <div className="date" key={this.props.date}>
        <h3>{this.state.date}</h3>
        {this.props.games.length > 1 ? (
          this.props.games.map(game => {
            return <Game game={game} key={game.gamePk} />;
          })
        ) : (
          <Game game={this.props.games[0]} key={this.props.games[0].gamePk} />
        )}
      </div>
    );
  }
}

export default GameDate;
