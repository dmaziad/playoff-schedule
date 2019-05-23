const axios = require("axios");

// const getGamesByDate = async () => {
//   let gameDates = [];
//   let games = {};
//   let res = await axios
//     .get(
//       "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
//     )
//     .then(response => {
//       for (let i = 0; i < response.data.series.length; i++) {
//         for (let j = 0; j < response.data.series[i].games.length; j++) {
//           let game = response.data.series[i].games[j];
//           //get dates without time
//           let date = game.gameDate.slice(0, 10);
//           if (!gameDates.includes(date)) {
//             gameDates.push(date);
//             //sort dates
//             let sortedDates = gameDates.sort((dateOne, dateTwo) => {
//               return new Date(dateOne) - new Date(dateTwo);
//             });
//             gameDates = sortedDates;
//           }
//           if (!games[date]) {
//             // add property to games object if no games exist on date
//             games[date] = [game];
//           } else {
//             // add game to array where key equals date
//             games[date].push(game);
//           }
//         }
//       }
//       return { view: "byDate", games: games, dates: gameDates };
//     })
//     .catch(err => console.error(err));
// };

// const getGamesByRound = () => {
//   axios
//     .get(
//       "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
//     )
//     .then(response => {
//       let rounds = [];
//       let seriesList = [
//         "NL Tiebreaker",
//         "AL Wild Card",
//         "NL Wild Card",
//         "ALDS",
//         "ALDS",
//         "NLDS",
//         "NLDS",
//         "ALCS",
//         "NLCS",
//         "World Series"
//       ];
//       for (let i = 0; i < response.data.series.length; i++) {
//         let round = response.data.series[i];
//         let seriesName = round.games[0].seriesStatus.shortName;
//         let index = seriesList.indexOf(seriesName);
//         seriesList.splice(index, 1, round);
//       }
//       this.setState({ rounds: seriesList, view: "byRound" }, () => {
//         console.log("state: ", this.state);
//       });
//     });
// };

// const handleData = () => {
//   let gameDates = [];
//   let games = {};
//   let rounds = [];
//   let seriesList = [
//     "NL Tiebreaker",
//     "AL Wild Card",
//     "NL Wild Card",
//     "ALDS",
//     "ALDS",
//     "NLDS",
//     "NLDS",
//     "ALCS",
//     "NLCS",
//     "World Series"
//   ];
//   axios
//     .get(
//       "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
//     )
//     .then(response => {
//       for (let i = 0; i < response.data.series.length; i++) {
//         let round = response.data.series[i];
//         let seriesName = round.games[0].seriesStatus.shortName;
//         let index = seriesList.indexOf(seriesName);
//         seriesList.splice(index, 1, round);
//       }
//       for (let i = 0; i < response.data.series.length; i++) {
//         for (let j = 0; j < response.data.series[i].games.length; j++) {
//           let game = response.data.series[i].games[j];
//           //get dates without time
//           let date = game.gameDate.slice(0, 10);
//           if (!gameDates.includes(date)) {
//             gameDates.push(date);
//             //sort dates
//             let sortedDates = gameDates.sort((dateOne, dateTwo) => {
//               return new Date(dateOne) - new Date(dateTwo);
//             });
//             gameDates = sortedDates;
//           }
//           if (!games[date]) {
//             // add property to games object if no games exist on date
//             games[date] = [game];
//           } else {
//             // add game to array where key equals date
//             games[date].push(game);
//           }
//         }
//       }
//     })
//     .then(() => {
//       return { dates: gameDates, games: games, rounds: seriesList };
//     });
// };

const handleData = async () => {
  let gameDates = [];
  let games = {};
  let rounds = [];
  let seriesList = [
    "NL Tiebreaker",
    "AL Wild Card",
    "NL Wild Card",
    "ALDS",
    "ALDS",
    "NLDS",
    "NLDS",
    "ALCS",
    "NLCS",
    "World Series"
  ];
  const response = await axios.get(
    "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
  );
  //   let mlbData = await response;
  let mlbData = await response.data;
  const cleanData = data => {
    for (let i = 0; i < data.series.length; i++) {
      let round = data.series[i];
      let seriesName = data.series[i].games[0].seriesStatus.shortName;
      let index = seriesList.indexOf(seriesName);
      seriesList.splice(index, 1, round);
    }
    for (let i = 0; i < data.series.length; i++) {
      for (let j = 0; j < data.series[i].games.length; j++) {
        let game = data.series[i].games[j];
        //get dates without time
        let date = game.gameDate.slice(0, 10);
        if (!gameDates.includes(date)) {
          gameDates.push(date);
          //sort dates
          let sortedDates = gameDates.sort((dateOne, dateTwo) => {
            return new Date(dateOne) - new Date(dateTwo);
          });
          gameDates = sortedDates;
        }
        if (!games[date]) {
          // add property to games object if no games exist on date
          games[date] = [game];
        } else {
          // add game to array where key equals date
          games[date].push(game);
        }
      }
    }
    console.log({ dates: gameDates, games: games, rounds: seriesList });
    return {
      view: "byDate",
      dates: gameDates,
      games: games,
      rounds: seriesList
    };
  };
  return await cleanData(mlbData);
};

module.exports = {
  handleData
};
