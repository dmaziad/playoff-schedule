const axios = require("axios");

const getData = async () => {
    const seriesList = [
        "NL Tiebreaker",
        "AL Wild Card", 
        "NL Wild Card",
        "ALDS",
        "NLDS",
        "ALCS",
        "NLCS",
        "World Series"
      ];
  const dates = [];
  const { data } = await axios.get(
    "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
  );
  const rounds = data.series.map(round => {
    const seriesName = round.games[0].seriesStatus.shortName;
    const games = round.games.map(game => {
      const date = game.gameDate.slice(0, 10);
      if (dates.indexOf(date) === -1) {
        dates.push(date);
      }
      return {
        gamePk: game.gamePk,
        gameDate: game.gameDate,
        decisions: game.decisions,
        linescore: game.linescore,
        seriesStatus: game.seriesStatus,
        broadcasts: game.broadcasts,
        teams: game.teams,
        status: game.status.detailedState,
        seriesDescription: game.seriesDescription,
        seriesGameNumber: game.seriesGameNumber
      };
    });
    return { seriesName: seriesName, games: games };
  });
  rounds.sort((roundA, roundB) => {
      return seriesList.indexOf(roundA.seriesName) > seriesList.indexOf(roundB.seriesName) ? 1 : -1
  })
  dates.sort((dateOne, dateTwo) => {
    return new Date(dateOne) - new Date(dateTwo);
  });

  return { rounds: rounds, dates: dates };
};

module.exports = {
  getData
};