import React from "react";

class GameByDate extends React.Component {
  constructor(props) {
    super(props);
    this.getBroadcast = this.getBroadcast.bind(this);
    this.getWidth = this.getWidth.bind(this);
  }

  componentDidMount() {
    this.getWidth();
    this.getBroadcast();
    window.addEventListener("resize", this.getWidth);
  }

  getBroadcast() {
    const { game } = this.props;
    let broadcast = game.broadcasts.find(el => {
      return el.type === "TV";
    });
    this.setState({ broadcast: broadcast });
  }

  getWidth() {
    let windowWidth = document.documentElement.clientWidth;
    this.setState({ width: windowWidth });
  }

  render() {
    const { game } = this.props;
    const awayTeam = game.teams.away;
    const homeTeam = game.teams.home;

    return (
      <div className="game">
        <div className="result">
          {game.seriesDescription === "Regular Season"
            ? game.seriesStatus.shortDescription
            : game.seriesDescription + " Gm " + game.seriesGameNumber}{" "}
          - {game.seriesStatus.result}
        </div>
        <div className="gameDetails">
          {this.state && this.state.width > 784 ? (
            <span className="awayTeam">
              <a
                href={`https://www.mlb.com/${awayTeam.team.teamName
                  .replace(/\s/g, "")
                  .toLowerCase()}`}
              >
                <img
                  src={`https://www.mlbstatic.com/team-logos/${
                    awayTeam.team.id
                  }.svg`}
                  height="20"
                  width="20"
                />
                {awayTeam.team.shortName} {game.linescore.teams.away.runs}
              </a>
            </span>
          ) : (
            <span className="score">
              <a
                href={`https://www.mlb.com/${awayTeam.team.teamName
                  .replace(/\s/g, "")
                  .toLowerCase()}`}
              >
                {awayTeam.team.abbreviation} {game.linescore.teams.away.runs}
              </a>{" "}
              {this.state && this.state.width < 500 ? <br /> : null}@{" "}
              <a
                href={`https://www.mlb.com/${homeTeam.team.teamName
                  .replace(/\s/g, "")
                  .toLowerCase()}`}
              >
                {homeTeam.team.abbreviation} {game.linescore.teams.home.runs}
              </a>
            </span>
          )}
          {this.state && this.state.width > 784 ? (
            <span className="homeTeam">
              @{" "}
              <a
                href={`https://www.mlb.com/${homeTeam.team.teamName
                  .replace(/\s/g, "")
                  .toLowerCase()}`}
              >
                <img
                  src={`https://www.mlbstatic.com/team-logos/${
                    homeTeam.team.id
                  }.svg`}
                  height="20"
                  width="20"
                />
                {homeTeam.team.shortName} {game.linescore.teams.home.runs}
              </a>
            </span>
          ) : null}
          {game.status.detailedState === "Final" ? (
            <span className="gameState">FINAL</span>
          ) : (
            <span className="gameState">
              {game.linescore.inningState} {game.linescore.currentInning}
            </span>
          )}
          <span className="broadcast">
            {this.state && this.state.broadcast
              ? this.state.broadcast.name
              : null}
          </span>
          {game.status.detailedState === "Final" ? (
            // list winning and losing pitcher if game status is final
            <span className="decision">
              <span className="winner">
                W:{" "}
                <a
                  href={`https://www.mlb.com/player/${
                    game.decisions.winner.id
                  }/${game.decisions.winner.fullName
                    .replace(/\s/g, "-")
                    .toLowerCase()}`}
                >
                  {game.decisions.winner.initLastName}
                </a>
              </span>{" "}
              <span className="loser">
                L:{" "}
                <a
                  href={`https://www.mlb.com/player/${
                    game.decisions.loser.id
                  }/${game.decisions.loser.fullName
                    .replace(/\s/g, "-")
                    .toLowerCase()}`}
                >
                  {game.decisions.loser.initLastName}
                </a>
              </span>{" "}
              {game.decisions.save ? (
                <span className="save">
                  S:{" "}
                  <a
                    href={`https://www.mlb.com/player/${
                      game.decisions.save.id
                    }/${game.decisions.save.fullName
                      .replace(/\s/g, "-")
                      .toLowerCase()}`}
                  >
                    {game.decisions.save.initLastName}
                  </a>
                </span>
              ) : null}
            </span>
          ) : (
            // list probable pitchers if game has not yet begun
            <span className="probablePitchers">
              A: {awayTeam.probablePitcher.initLastName} H:{" "}
              {homeTeam.probablePitcher.initLastName}
            </span>
          )}
          <span className="recap">
            <span className="wrap">
              <a href={`https://www.mlb.com/gameday/${game.gamePk}/final/wrap`}>
                Wrap
              </a>{" "}
            </span>
            <span className="video">
              <a
                href={`https://www.mlb.com/gameday/${game.gamePk}/final/video`}
              >
                <img
                  src="http://mlb.mlb.com/images/icons/mlb_tv.gif"
                  alt="tv"
                />{" "}
                {this.state && this.state.width > 625 ? "Video" : null}
              </a>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default GameByDate;
