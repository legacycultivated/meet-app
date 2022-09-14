import "./nprogress.css";
import React, { Component } from "react";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import EventGenre from "./EventGenre";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EventGenre from "./EventGenre";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32, // will hold the number of events to show
    currentLocation: "all", // will hold the selected location
    showWelcomeScreen: undefined,
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <h1>Meet App</h1>
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

        <div className="data-vis-wrapper">
          <h4>Event genres</h4>
          <EventGenre events={events} />
          <h4>Events in each city</h4>
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
