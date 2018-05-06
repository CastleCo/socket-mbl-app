import * as actionsTypes from "./action-types";

describe("auth.actionTypes", () => {
  it("should match the snapshot", () => {
    expect(actionsTypes).toMatchSnapshot();
  });
});