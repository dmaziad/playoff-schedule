import React from "react";

const Options = ({ toggleView, view }) => {
  return (
    <div className="options">
      <button
        className="optionLeft"
        id={view === "byDate" ? "selected" : "unselected"}
        onClick={() => toggleView("byDate")}
      >
        By Date
      </button>
      <button
        className="optionRight"
        id={view === "byRound" ? "selected" : "unselected"}
        onClick={() => toggleView("byRound")}
      >
        By Round
      </button>
    </div>
  );
};

export default Options;
