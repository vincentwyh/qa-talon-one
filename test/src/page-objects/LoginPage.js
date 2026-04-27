/**
 * Centralizes selectors for login-related UI elements.
 */
export default class LoginPage {
  selectors = {
    containers: {
      modal: '#logInModal',
    },
    buttons: {
      login: '#login2',
      logout: '#logout2',
      submit: '#logInModal .btn-primary',
    },
    fields: {
      username: '#loginusername',
      password: '#loginpassword',
    },
    texts: {
      loggedInUser: '#nameofuser',
    },
  };
}
