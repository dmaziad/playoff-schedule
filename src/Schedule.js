import React from "react";
import GameDate from "./GameDate";
import Rounds from "./Rounds";
import uniqid from "uniqid";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
    this.getWidth = this.getWidth.bind(this);
  }

  componentDidMount() {
    this.getWidth();
    window.addEventListener("resize", this.getWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getWidth);
  }

  getWidth() {
    let windowWidth = document.documentElement.clientWidth;
    this.setState({ width: windowWidth });
  }

  render() {
    const { dates, rounds, view } = this.props;
    return (
      <div className="schedule">
        {view === "byDate"
          ? dates.map(date => {
              const games = rounds.reduce((acc, round) => {
                const filteredGames = round.games.filter(game =>
                  game.gameDate.includes(date)
                );
                return [...acc, ...filteredGames];
              }, []);
              return (
                <GameDate
                  key={date}
                  date={date}
                  games={games}
                  view={view}
                  width={this.state.width}
                />
              );
            })
          : rounds.map(round => {
              return (
                <Rounds
                  key={uniqid(`schedule-`)}
                  view={view}
                  round={round}
                  width={this.state.width}
                />
              );
            })}
      </div>
    );
  }
}

export default Schedule;
