import React from "react";
import moment from "moment";

class GameDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(this.props.date).format("LL")
    };
  }

  componentDidMount() {
    console.log("GameDate props: ", this.props);
  }
  render() {
    return (
      <div className="date">
        <h3>{this.state.date}</h3>
      </div>
    );
  }
}

export default GameDate;
