import React from "react";
import { render } from "react-dom";
import axios from "axios";
import Schedule from "./Schedule.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getGamesByDate = this.getGamesByDate.bind(this);
    this.getGamesByRound = this.getGamesByRound.bind(this);
  }

  componentDidMount() {
    // default view should display schedule by date
    this.getGamesByDate();
  }

  getGamesByDate() {
    let gameDates = [];
    let games = {};
    axios
      .get(
        "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
      )
      .then(response => {
        for (let i = 0; i < response.data.series.length; i++) {
          for (let j = 0; j < response.data.series[i].games.length; j++) {
            let game = response.data.series[i].games[j];
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
        this.setState({ view: "byDate", games: games, dates: gameDates });
      })
      .catch(err => console.error(err));
  }

  getGamesByRound() {
    axios
      .get(
        "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
      )
      .then(response => {
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
        for (let i = 0; i < response.data.series.length; i++) {
          let round = response.data.series[i];
          let seriesName = round.games[0].seriesStatus.shortName;
          let index = seriesList.indexOf(seriesName);
          seriesList.splice(index, 1, round);
        }
        this.setState({ rounds: seriesList, view: "byRound" }, () => {
          console.log("state: ", this.state);
        });
      });
  }

  renderView() {
    if (!this.state || !this.state.view) {
      return <div>loading...</div>;
    } else if (this.state.view === "byDate") {
      console.log("state: ", this.state.dates);
      return (
        <div>
          <span className="options">
            <span className="optionLeft" id="selected">
              By Date
            </span>
            <span
              className="optionRight"
              id="unselected"
              onClick={this.getGamesByRound}
            >
              By Round
            </span>
          </span>
          <Schedule
            dates={this.state.dates}
            games={this.state.games}
            view={this.state.view}
          />
        </div>
      );
    } else if (this.state.view === "byRound") {
      return (
        <div>
          <span className="options">
            <span
              className="optionLeft"
              id="unselected"
              onClick={this.getGamesByDate}
            >
              By Date
            </span>
            <span className="optionRight" id="selected">
              By Round
            </span>
          </span>
          <Schedule rounds={this.state.rounds} view={this.state.view} />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <span className="app">
          <span className="heading">
            <h2>Schedule</h2>
          </span>
          <br />
          {this.renderView()}
        </span>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
