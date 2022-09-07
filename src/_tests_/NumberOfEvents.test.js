import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents numberOfEvents={32} />);
  });

  test("render number input", () => {
    expect(NumberOfEventsWrapper.find(".number-input")).toHaveLength(1);
  });

  test("render default number of input to 32", () => {
    expect(NumberOfEventsWrapper.find(".number-input").prop("value")).toBe(32);
  });
});
