import { call, put } from "redux-saga/effects";
import { authorize } from "@shoutem/fetch-token-intercept";
import { NavigationActions } from "react-navigation";

// mock auth service during test
jest.mock("../../api/Auth.service");
import * as AuthService from '../../api/Auth.service';

import * as actions from "./actions";
import * as sagas from "./sagas";

// troll hahahahahahahha berna was here lmfao
const users = require('../../api/__mocks__/users.json');

describe('Login Saga', () => {

  it('should fire a specific sequence of events if successful', () => {
    const user = users[0];
    // TODO: fix once accessToken !== refresh Token
    const token = "randomToken";
    const accessToken = token;
    const refreshToken = token;

    const loginAction = actions.login(user.email, user.password);

    const gen = sagas.requestLogin(loginAction);

    // first, it should send the request to the auth service
    let next = gen.next();
    expect(next.value).toEqual(call(AuthService.login, loginAction.payload));

    // it should then save the user
    next = gen.next({ user, token, refreshToken, accessToken });
    expect(next.value).toEqual(put(actions.setUser(user)));

    // it should then save the tokens
    next = gen.next(() => authorize(refreshToken, accessToken));
    expect(next.value).toEqual(call(authorize, refreshToken, accessToken))

    // finally, it should move into the app
    const navAction = NavigationActions.navigate({ routeName: 'App' });
    next = gen.next(navAction);
    expect(next.value).toEqual(put(navAction));

    // and it should end
    expect(gen.next().done).toEqual(true);
  });

  it('should fire errors on failure', () => {

  });
});

describe('Registration Saga', () => {

  it('should fire a specific sequence of events if successful', () => {
    // TODO: implement this
  });

  it('should fire errors on failure', () => {
    // TODO: implement this
  });
})