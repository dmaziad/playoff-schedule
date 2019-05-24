import React from "react";
import { render } from "react-dom";
import { handleData, getData } from "../lib/fetch.js";
import Options from "./Options";
import Schedule from "./Schedule";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "byDate",
      dates: [],
      rounds: []
    };

    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    getData().then(data => {
      this.setState({ ...data });
    });
  }

  toggleView(view) {
    this.setState({ view: view });
  }

  render() {
    const { view, dates, rounds } = this.state;
    return (
      <div className="app">
        <div className="heading-bar">
          <h2 className="title">
            <span className="heading">Schedule</span>
          </h2>
        </div>
        <Options toggleView={this.toggleView} view={view} />
        <Schedule dates={dates} view={view} rounds={rounds} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
