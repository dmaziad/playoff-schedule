import React from "react";
import moment from "moment";

class GameByRound extends React.Component {
  constructor(props) {
    super(props);
    this.getBroadcast = this.getBroadcast.bind(this);
  }

  componentDidMount() {
    this.getBroadcast();
  }

  getBroadcast() {
    const { game } = this.props;
    let broadcast = game.broadcasts.find(el => {
      return el.type === "TV";
    });
    this.setState({ broadcast: broadcast });
  }

  render() {
    const { game } = this.props;
    return (
      <div className="game">
        <div className="result">
          {game.seriesDescription === "Regular Season"
            ? game.seriesStatus.shortDescription
            : game.seriesDescription + " Gm " + game.seriesGameNumber}{" "}
          - {game.seriesStatus.result}
        </div>
        <div className="roundGameDetails">
          <span className="roundDate">
            {moment(game.gameDate).format("MMM D")}
          </span>
          <span className="roundScore">
            <img
              src={`https://www.mlbstatic.com/team-logos/${
                game.teams.away.team.id
              }.svg`}
              height="20"
              width="20"
            />
            {game.teams.away.team.shortName} {game.linescore.teams.away.runs} @{" "}
            <img
              src={`https://www.mlbstatic.com/team-logos/${
                game.teams.home.team.id
              }.svg`}
              height="20"
              width="20"
            />
            {game.teams.home.team.shortName} {game.linescore.teams.home.runs}
          </span>
          {game.status.detailedState === "Final" ? (
            <span className="roundGameState">FINAL</span>
          ) : (
            <span className="roundGameState">
              {game.linescore.inningState} {game.linescore.currentInning}
            </span>
          )}
          <span className="roundBroadcast">
            {this.state && this.state.broadcast
              ? this.state.broadcast.name
              : null}
          </span>
          {game.status.detailedState === "Final" ? (
            // list winning and losing pitcher if game status is final
            <span className="roundDecision">
              <span className="winner">
                W: {game.decisions.winner.initLastName}
              </span>{" "}
              <span className="loser">
                L: {game.decisions.loser.initLastName}
              </span>{" "}
              {game.decisions.save ? (
                <span className="save">
                  S: {game.decisions.save.initLastName}
                </span>
              ) : null}
            </span>
          ) : (
            // list probable pitchers if game has not yet begun
            <span className="roundProbablePitchers">
              A: {game.teams.away.probablePitcher.initLastName} H:{" "}
              {game.teams.home.probablePitcher.initLastName}
            </span>
          )}
          <span className="roundWrap">
            <a href={`https://www.mlb.com/gameday/${game.gamePk}/final/wrap`}>
              Wrap
            </a>{" "}
            <a href={`https://www.mlb.com/gameday/${game.gamePk}/final/video`}>
              <img src="http://mlb.mlb.com/images/icons/mlb_tv.gif" alt="tv" />
            </a>
          </span>
        </div>
      </div>
    );
  }
}

export default GameByRound;
