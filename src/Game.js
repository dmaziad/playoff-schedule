import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { broadcast: { name: "MLB" } };
    this.getBroadcast = this.getBroadcast.bind(this);
  }

  getBroadcast() {
    let broadcast = this.props.game.broadcasts.find(el => {
      return el.type === "TV";
    });
    this.setState({ broadcast: broadcast });
  }

  componentDidMount() {
    this.getBroadcast();
    console.log("Game props: ", this.props.game);
  }

  render() {
    return (
      <div className="game">
        {/* Placeholder */}
        <div className="result">
          {this.props.game.seriesDescription === "Regular Season"
            ? this.props.game.seriesStatus.shortDescription
            : this.props.game.seriesDescription +
              " Gm " +
              this.props.game.seriesGameNumber}{" "}
          - {this.props.game.seriesStatus.result}
        </div>
        <div className="gameDetails">
          <span className="score">
            {this.props.game.teams.away.team.shortName}{" "}
            {this.props.game.linescore.teams.away.runs} @{" "}
            {this.props.game.teams.home.team.shortName}{" "}
            {this.props.game.linescore.teams.home.runs}
          </span>
          {this.props.game.status.detailedState === "Final" ? (
            <span className="gameState">FINAL</span>
          ) : (
            <span className="gameState">
              {this.props.game.linescore.inningState}{" "}
              {this.props.game.linescore.currentInning}
            </span>
          )}
          <span className="broadcast">
            {this.state.broadcast ? this.state.broadcast.name : null}
          </span>
          {this.props.game.status.detailedState === "Final" ? (
            // list winning and losing pitcher if game status is final
            <span className="decision">
              <span className="winner">
                W: {this.props.game.decisions.winner.initLastName}
              </span>{" "}
              <span className="loser">
                L: {this.props.game.decisions.loser.initLastName}
              </span>{" "}
              {this.props.game.decisions.save ? (
                <span className="save">
                  S: {this.props.game.decisions.save.initLastName}
                </span>
              ) : null}
            </span>
          ) : (
            // list probable pitchers if game has not yet begun
            <span className="probablePitchers">
              A: {this.props.game.teams.away.probablePitcher.initLastName} H:{" "}
              {this.props.game.teams.home.probablePitcher.initLastName}
            </span>
          )}
          <span className="wrap">
            <a
              href={`https://www.mlb.com/gameday/${
                this.props.game.gamePk
              }/final/wrap`}
            >
              Wrap
            </a>{" "}
            <a
              href={`https://www.mlb.com/gameday/${
                this.props.game.gamePk
              }/final/video`}
            >
              Video
            </a>
          </span>
        </div>
      </div>
    );
  }
}

export default Game;
