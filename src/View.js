import React from "react";
import Schedule from "./Schedule";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "byDate"
    };
    this.getGamesByDate = this.getGamesByDate.bind(this);
    this.getGamesByRound = this.getGamesByRound.bind(this);
  }

  getGamesByDate() {
    this.setState({ view: "byDate" });
  }

  getGamesByRound() {
    this.setState({ view: "byRound" });
  }

  render() {
    let state = this.props.state;
    let view = this.state.view;
    if (this.props) {
      const { view, dates, games, rounds } = this.props.state;
    }
    if (!this.props.state || !this.state.view) {
      return <div>loading...</div>;
    } else if (view === "byDate") {
      console.log("state: ", this.props.state.dates);
      return (
        <div>
          <span className="options">
            <button className="optionLeft" id="selected">
              By Date
            </button>
            <button
              className="optionRight"
              id="unselected"
              onClick={this.getGamesByRound}
            >
              By Round
            </button>
          </span>
          <Schedule dates={state.dates} games={state.games} view={state.view} />
        </div>
      );
    } else if (view === "byRound") {
      return (
        <div>
          <span className="options">
            <button
              className="optionLeft"
              id="unselected"
              onClick={this.getGamesByDate}
            >
              By Date
            </button>
            <button className="optionRight" id="selected">
              By Round
            </button>
          </span>
          <Schedule rounds={state.rounds} view={view} />
        </div>
      );
    }
  }
}

export default View;
