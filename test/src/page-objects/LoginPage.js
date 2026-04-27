export default class LoginPage {
  selectors = {
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
