const API_ROOT_URL = require('./config.json').API_ROOT_URL;

export default configuration = {
  // (Required) Prepare fetch request for renewing new access token
  createAccessTokenRequest: (refreshToken) => fetch(`${API_ROOT_URL}/auth/token/refresh`),

  // (Required) Parses access token from access token response
  parseAccessToken: resp => resp.token,

  // (Required) Defines whether interceptor will intercept this request or just let it pass through
  shouldIntercept: req => true,

  // (Required) Defines whether access token will be invalidated after this response
  shouldInvalidateAccessToken: resp => false,

  // When set, response which invalidates token will be resolved after the token has been renewed
  // in effect, token will be loaded in sync with response, otherwise renew will run async to response
  shouldWaitForTokenRenewal: true,

  // Checks if response should be considered unauthorized (by default only 401 responses are 
  // considered unauthorized). Override this method if you need to trigger token renewal for 
  // other response statuses. Check API reference for helper method which defines default behaviour
  // isResponseUnauthorized: (response) => boolean,

  // (Required) Adds authorization for intercepted requests
  authorizeRequest: (request, accessToken) => {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
    return request;
  },

  // Number of retries after initial request was unauthorized
  fetchRetryCount: 1,

  // Event invoked when access token has changed
  // onAccessTokenChange: null,

  // Event invoked when response is resolved
  // onResponse: null,
}