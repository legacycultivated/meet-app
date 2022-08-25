import React, { Component } from "react";

class NumberOfEvents extends Component {
  handleInputChanged = (event) => {
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
      </div>
    );
  }
}
export default NumberOfEvents;
