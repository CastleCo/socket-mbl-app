
import { AUTH_LOGIN, AUTH_REGISTER } from '../actionTypes/auth';

export default function auth(state = {}, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return Object.assign(
                {},
                state,
                {
                    authenticated: true,
                    user: action.payload.user
                }
            );
        case AUTH_REGISTER:
            return Object.assign(
                {},
                state,
                {
                    onBoarding: true,
                    authenticated: true,
                    user: action.payload.user
                }
            );
        default:
            return {
                user: undefined,
                authenticated: false,
            }
    }
}
