import LoginPage from '../page-objects/LoginPage';
import { getDemoUserCredentials } from '../helpers';
import { routes } from '@test-data/routes';

export default class LoginPageActions {
  constructor() {
    this.loginPage = new LoginPage();
    this.alertAlias = 'loginAlert';
  }

  openLoginModal() {
    cy.get(this.loginPage.selectors.buttons.login).click();

    return cy.get(this.loginPage.selectors.fields.username).should('be.visible');
  }

  fillCredentials(username, password) {
    cy.get(this.loginPage.selectors.fields.username)
      .should('be.visible')
      .clear();
    cy.get(this.loginPage.selectors.fields.username).type(username);
    cy.get(this.loginPage.selectors.fields.password)
      .should('be.visible')
      .clear();

    return cy.get(this.loginPage.selectors.fields.password).type(password);
  }

  submitLogin() {
    return cy.get(this.loginPage.selectors.buttons.submit).click();
  }

  captureLoginAlert() {
    return cy.window().then((win) => {
      cy.stub(win, 'alert').as(this.alertAlias);
    });
  }

  verifyLoginAlert(expectedMessage) {
    return cy
      .get(`@${this.alertAlias}`)
      .should('have.been.calledOnceWithExactly', expectedMessage);
  }

  verifyLoggedIn(username) {
    return cy
      .get(this.loginPage.selectors.texts.loggedInUser, { timeout: 20000 })
      .should('contain', `Welcome ${username}`);
  }

  logoutIfNeeded() {
    return cy.get('body').then(($body) => {
      const hasVisibleLogoutButton = $body
        .find(`${this.loginPage.selectors.buttons.logout}:visible`)
        .length > 0;

      if (!hasVisibleLogoutButton) {
        return;
      }

      cy.get(this.loginPage.selectors.buttons.logout).click();
      cy
        .get(this.loginPage.selectors.buttons.login, { timeout: 20000 })
        .should('be.visible');
    });
  }

  login(username, password) {
    return this.openLoginModal()
      .then(() => this.fillCredentials(username, password))
      .then(() => this.submitLogin());
  }

  loginAndVerify(username, password) {
    return this.login(username, password).then(() => this.verifyLoggedIn(username));
  }

  loginAsDemoUser() {
    const { username, password } = getDemoUserCredentials();

    cy.visit(routes.home);

    return this.logoutIfNeeded().then(() => this.loginAndVerify(username, password));
  }
}
