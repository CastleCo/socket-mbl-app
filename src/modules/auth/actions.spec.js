import * as actions from "./actions";

describe("actions.setUser", () => {
  it("should match the snapshot", () => {
    expect(actions.setUser("USER")).toMatchSnapshot();
  });
});

describe("actions.setTokens", () => {
  it("should match the snapshot", () => {
    expect(actions.setTokens("ACCESS_TOKEN", "REFRESH_TOKEN")).toMatchSnapshot();
  });
});

describe("actions.login", () => {
  it("should match the snapshot", () => {
    expect(actions.login("USER_EMAIL", "USER_PASSWORD")).toMatchSnapshot();
  });
});

describe("actions.register", () => {
  it("should match the snapshot", () => {
    expect(actions.register("USER_EMAIL", "USER_PASSWORD", "USER_FIRSTNAME", "USER_LASTNAME")).toMatchSnapshot();
  });
});