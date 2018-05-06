import React from "react";
import { shallow, render, mount } from "enzyme";

import ButtonBlockLink from "./ButtonBlockLink";

describe('ButtonBlockLink', () => {

  it("should render the inputted text", () => {
    const testText = "TEST LINK TEST";
    const instance = render(
      <ButtonBlockLink onPress={jest.fn()}>{testText}</ButtonBlockLink>
    );
    expect(instance.text()).toContain(testText);
  });

  it("should call the given function when pressed", () => {
    const clickButton = jest.fn();
    const instance = shallow(
      <ButtonBlockLink onPress={clickButton}></ButtonBlockLink>
    );
    expect(clickButton.mock.calls.length).toBe(0);
    instance.simulate('press');
    expect(clickButton.mock.calls.length).toBe(1);
  });
});