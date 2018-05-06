import React from "react";

import { shallow } from "enzyme";

import { LoginScreen } from "./LoginScreen";
import { LoginForm, Header, ButtonBlockLink } from "../components";

describe("LoginScreen", () => {
  let screen;
  beforeEach(() => {
    screen = shallow(<LoginScreen
      formErrors={{}}
      formError={{}}
      awaitingResponse={false}
      onLogin={_ => null}
      goToForgotPwScreen={_ => null}
      goToRegisterScreen={_ => null}
    />);
  });

  it("should render the branding header", () => {
    expect(screen.find(Header).length).toBe(1);
  });

  it("should render the LoginForm", () => {
    expect(screen.find(LoginForm).length).toBe(1);
  });

  it("should render a link to go to the register and forgot-password screens", () => {
    expect(screen.find(ButtonBlockLink).length).toBe(2);
  });
})