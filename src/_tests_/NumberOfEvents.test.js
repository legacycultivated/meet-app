import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render number input", () => {
    expect(NumberOfEventsWrapper.find(".number-input")).toHaveLength(1);
  });

  test("render default number of input to 32", () => {
    expect(NumberOfEventsWrapper.find(".number-input").prop("value")).toBe(32);
  });

  test("render number change of events in input field by changing state", () => {
    NumberOfEventsWrapper.setState({
      numOfEvents: 32,
    });
    const eventObject = { target: { value: 12 } };
    NumberOfEventsWrapper.find(".number-input").simulate("change", eventObject);
    expect(NumberOfEventsWrapper.state("numOfEvents")).toBe(12);
  });
});
