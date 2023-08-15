const apiPath = '/api/v1/';

export default {
  loginPage: '/login',
  chatPage: '/',
  signupPage: '/signup',
  loginPath: () => [apiPath, 'login'].join(''),
  dataPath: () => [apiPath, 'data'].join(''),
  signupPath: () => [apiPath, 'signup'].join(''),
};
