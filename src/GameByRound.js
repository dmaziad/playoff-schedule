import React from "react";
import moment from "moment";

const GameByRound = ({ game, width }) => {
  const awayTeam = game.teams.away;
  const homeTeam = game.teams.home;
  const broadcast = game.broadcasts.find(el => {
    return el.type === "TV";
  });

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
        {width > 784 ? (
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
                height="25"
                width="25"
              />
              {awayTeam.team.shortName} {game.linescore.teams.away.runs}
            </a>
          </span>
        ) : (
          <span className="roundScore">
            <a
              href={`https://www.mlb.com/${awayTeam.team.teamName
                .replace(/\s/g, "")
                .toLowerCase()}`}
            >
              {awayTeam.team.abbreviation} {game.linescore.teams.away.runs}
            </a>{" "}
            {width < 500 ? <br /> : null}@{" "}
            <a
              href={`https://www.mlb.com/${homeTeam.team.teamName
                .replace(/\s/g, "")
                .toLowerCase()}`}
            >
              {homeTeam.team.abbreviation} {game.linescore.teams.home.runs}
            </a>
          </span>
        )}
        {width > 784 ? (
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
                height="25"
                width="25"
              />
              {homeTeam.team.shortName} {game.linescore.teams.home.runs}
            </a>
          </span>
        ) : null}
        {game.status === "Final" ? (
          <span className="roundGameState">FINAL</span>
        ) : (
          <span className="roundGameState">
            {game.linescore.inningState} {game.linescore.currentInning}
          </span>
        )}
        <span className="roundBroadcast">
          {broadcast ? (
            <img
            src={`https://s3.us-east-2.amazonaws.com/dm-mlb-image-bucket/${broadcast.name
              .toLowerCase()
              .slice(0, 3)}.png`}
              className={`broadcast-image ${broadcast.name.toLowerCase()}`}
          />
          ) : null}
        </span>
        {game.status.detailedState === "Final" ? (
          // list winning and losing pitcher if game status is final
          <span className="roundDecision">
            <span className="roundWinner">
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
            <span className="roundLoser">
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
              <span className="roundSave">
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
        <span className="roundRecap">
          <span className="wrap">
            <a href={`https://www.mlb.com/gameday/${game.gamePk}/final/wrap`}>
              <img src="https://s3.us-east-2.amazonaws.com/dm-mlb-image-bucket/wrap.png" />
              {width > 625 ? "Wrap" : null}
            </a>{" "}
          </span>
          <span className="video">
            <a href={`https://www.mlb.com/gameday/${game.gamePk}/final/video`}>
              <img src="http://mlb.mlb.com/images/icons/mlb_tv.gif" alt="tv" />{" "}
              {width > 625 ? "Video" : null}
            </a>
          </span>
        </span>
      </div>
    </div>
  );
};

export default GameByRound;
