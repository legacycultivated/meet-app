import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    infoText: "",
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value >= 33 || value <= 0) {
      this.setState({
        numberOfEvents: value,
        infoText: "Please enter a number between 1 - 32.",
      });
    } else {
      this.setState({
        numberOfEvents: event.target.value,
        infoText: " ",
      });
    }
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <div className="numberOfEvents">
        <div className="numberOfEvents">
          <h3>Number Of Events:</h3>
          <input
            className="number-input"
            value={this.props.numberOfEvents}
            onChange={this.handleInputChanged}
          />
        </div>
        <div>
          <ErrorAlert text={this.state.infoText} />
        </div>
      </div>
    );
  }
}
export default NumberOfEvents;
