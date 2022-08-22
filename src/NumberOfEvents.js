import React, { Component } from "react";

class NumberOfEvents extends Component {
  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ numOfEvents: value });
  };
  state = { numOfEvents: 32 };
  render() {
    return (
      <div className="numberOfEvents">
        <div className="numberOfEvents">
          <input
            className="number-input"
            value={this.state.numOfEvents}
            onChange={this.handleInputChanged}
          />
        </div>
      </div>
    );
  }
}
export default NumberOfEvents;
