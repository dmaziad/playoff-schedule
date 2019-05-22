import React from "react";
import { render } from "react-dom";
import axios from "axios";
import Schedule from "./Schedule.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "loading"
    };
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
        this.setState({ games: games, dates: gameDates });
      })
      .catch(err => console.error(err));
  }

  getGamesBySeries() {
    axios
      .get(
        "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
      )
      .then(response => {
        console.log(response.data.series);
      });
  }

  renderView() {
    if (!this.state.dates) {
      return <div>loading...</div>;
    } else {
      console.log("state: ", this.state.dates);
      return (
        <React.Fragment>
          <Schedule dates={this.state.dates} games={this.state.games} />
        </React.Fragment>
      );
    }
  }

  componentDidMount() {
    // default view should display schedule by date
    this.getGamesByDate();
  }

  render() {
    return (
      <div>
        <h1>Schedule</h1>
        {this.renderView()}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
