import React from "react";
import GameByRound from "./GameByRound";

class Rounds extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="round"
        key={this.props.round.games[0].seriesStatus.shortName}
      >
        <h3>{this.props.round.games[0].seriesStatus.shortName}</h3>
        {this.props.round.games.length > 1 ? (
          this.props.round.games.map(game => {
            return <GameByRound game={game} key={game.gamePk} />;
          })
        ) : (
          <GameByRound game={this.props.round.games[0]} />
        )}
      </div>
    );
  }
}

export default Rounds;
