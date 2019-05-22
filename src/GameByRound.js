import React from "react";
import moment from "moment";

class GameByRound extends React.Component {
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
    console.log("mouting with props: ", this.props.game);
  }

  render() {
    // return <div>Hello</div>;
    return (
      <div className="game">
        <div className="result">
          {this.props.game.seriesDescription === "Regular Season"
            ? this.props.game.seriesStatus.shortDescription
            : this.props.game.seriesDescription +
              " Gm " +
              this.props.game.seriesGameNumber}{" "}
          - {this.props.game.seriesStatus.result}
        </div>
        <div className="roundGameDetails">
          <span className="roundDate">
            {moment(this.props.game.gameDate).format("MMM D")}
          </span>
          <span className="roundScore">
            {this.props.game.teams.away.team.shortName}{" "}
            {this.props.game.linescore.teams.away.runs} @{" "}
            {this.props.game.teams.home.team.shortName}{" "}
            {this.props.game.linescore.teams.home.runs}
          </span>
          {this.props.game.status.detailedState === "Final" ? (
            <span className="roundGameState">FINAL</span>
          ) : (
            <span className="roundGameState">
              {this.props.game.linescore.inningState}{" "}
              {this.props.game.linescore.currentInning}
            </span>
          )}
          <span className="roundBroadcast">
            {this.state.broadcast ? this.state.broadcast.name : null}
          </span>
          {this.props.game.status.detailedState === "Final" ? (
            // list winning and losing pitcher if game status is final
            <span className="roundDecision">
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
            <span className="roundProbablePitchers">
              A: {this.props.game.teams.away.probablePitcher.initLastName} H:{" "}
              {this.props.game.teams.home.probablePitcher.initLastName}
            </span>
          )}
          <span className="roundWrap">
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

export default GameByRound;
