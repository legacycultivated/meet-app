import "./nprogress.css";
import React, { Component } from "react";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { WarningAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32, // will hold the number of events to show
    currentLocation: "all", // will hold the selected location
  };
  updateEvents = (location, eventCount) => {
    this.mounted = true;

    getEvents().then((events) => {
      // if eventCount is set we use that value, if not we use the state value
      const limit = eventCount ?? this.state.numberOfEvents;

      // if currentLocation is set we use that value, if not we use the state value
      const currentLocation = location ?? this.state.currentLocation;

      // return all the events or just the filtered slice
      const locationEvents =
        // if the current location is set to all
        currentLocation === "all"
          ? // then return all events
            events.slice(0, limit)
          : // otherwise filter location based on user location and limit set by the user
            events
              .filter((event) => event.location === currentLocation)
              .slice(0, limit);

      if (this.mounted) {
        // update the state
        this.setState({
          events: locationEvents,
          numberOfEvents: limit,
          currentLocation: currentLocation,
        });
      }
    });
  };

  updateNumberOfEvents = (number) => {
    this.setState({
      numberOfEvents: number,
    });
    this.updateEvents("all", number);
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
    if (!navigator.onLine) {
      this.setState({
        warningText:
          "It seems that you're not connected to the internet, your data was loaded from the cache.",
      });
    } else {
      this.setState({
        warningText: "",
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <WarningAlert text={this.state.warningText} />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />

        <br />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
