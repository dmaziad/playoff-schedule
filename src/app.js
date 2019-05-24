import React from "react";
import { render } from "react-dom";
import { handleData } from "../lib/fetch.js";
import View from "./View";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getGamesByDate = this.getGamesByDate.bind(this);
    this.getGamesByRound = this.getGamesByRound.bind(this);
  }

  async componentDidMount() {
    if (!this.state) {
      (async () => {
        try {
          let state = await handleData();
          await this.setState(state);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }

  getGamesByDate() {
    this.setState({ view: "byDate" });
  }

  getGamesByRound() {
    this.setState({ view: "byRound" });
  }

  render() {
    return (
      <div>
        <span className="app">
          <div className="heading-bar">
            <h2 className="title">
              <span className="heading">Schedule</span>
            </h2>
          </div>
          <br />
          {this.state ? (
            <View
              state={this.state}
              getGamesByDate={this.getGamesByDate}
              getGamesByRound={this.getGamesByRound}
            />
          ) : null}
        </span>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
