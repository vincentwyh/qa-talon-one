import LoginPage from '../page-objects/LoginPage';
import { getDemoUserCredentials } from '../helpers';
import { routes } from '@test-data/routes';
import { timeouts } from '@test-data/timeouts';

export default class LoginPageActions {
  constructor() {
    this.loginPage = new LoginPage();
    this.alertAlias = 'loginAlert';
  }

  /**
   * Opens the login modal and verifies that username and password fields are visible.
   *
   * @returns {void}
   */
  openLoginModal() {
    cy.get(this.loginPage.selectors.buttons.login)
      .should('be.visible')
      .click();
    cy
      .get(this.loginPage.selectors.containers.modal)
      .should('be.visible')
      .within(() => {
        cy.get(this.loginPage.selectors.fields.username).should('be.visible');
        cy.get(this.loginPage.selectors.fields.password).should('be.visible');
      });
  }

  /**
   * Fills the login credentials into the username and password fields.
   *
   * @param {string} username - The username to enter.
   * @param {string} password - The password to enter.
   * @returns {void}
   */
  fillCredentials(username, password) {
    cy.get(this.loginPage.selectors.fields.username).should('be.visible');
    cy.get(this.loginPage.selectors.fields.username).clear();
    cy.get(this.loginPage.selectors.fields.username).type(username);
    cy.get(this.loginPage.selectors.fields.password).should('be.visible');
    cy.get(this.loginPage.selectors.fields.password).clear();
    cy.get(this.loginPage.selectors.fields.password).type(password);
  }

  /**
   * Submits the login form by clicking the submit button.
   *
   * @returns {void}
   */
  submitLogin() {
    cy.get(this.loginPage.selectors.buttons.submit).click();
  }

  /**
   * Verifies that the authenticated user banner matches the expected username.
   *
   * @param {string} username - The username expected in the welcome banner.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  verifyLoggedIn(username) {
    return cy
      .get(this.loginPage.selectors.texts.loggedInUser, { timeout: timeouts.shortWait })
      .should('contain', `Welcome ${username}`);
  }

  /**
   * Verifies that the login entry point is available, indicating no active UI session.
   *
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  verifyNotLoggedIn() {
    return cy
      .get(this.loginPage.selectors.buttons.login, { timeout: timeouts.shortWait })
      .should('be.visible');
  }

  /**
   * Checks whether the current page already shows a valid authenticated session for
   * the expected username.
   *
   * @param {string} username - The username expected for the current session.
   * @returns {Cypress.Chainable<boolean>}
   */
  hasValidSession(username) {
    return cy.get('body').then(($body) => {
      const hasVisibleLogoutButton = $body
        .find(`${this.loginPage.selectors.buttons.logout}:visible`)
        .length > 0;
      const loggedInBannerText = $body
        .find(this.loginPage.selectors.texts.loggedInUser)
        .text()
        .trim();

      return hasVisibleLogoutButton && loggedInBannerText === `Welcome ${username}`;
    });
  }

  /**
   * Logs out when the UI still exposes an authenticated state from a previous test.
   *
   * @returns {Cypress.Chainable<null | JQuery<HTMLElement>>}
   */
  logoutIfNeeded() {
    return cy.get('body').then(($body) => {
      const hasVisibleLogoutButton = $body
        .find(`${this.loginPage.selectors.buttons.logout}:visible`)
        .length > 0;

      if (!hasVisibleLogoutButton) {
        return cy.wrap(null);
      }

      cy.get(this.loginPage.selectors.buttons.logout)
        .should('be.visible')
        .click();

      return cy
        .get(this.loginPage.selectors.buttons.login, { timeout: timeouts.shortWait })
        .should('be.visible');
    });
  }

  /**
   * Performs a login submission with the provided credentials.
   *
   * @param {string} username - The username to submit.
   * @param {string} password - The password to submit.
   * @returns {void}
   */
  login(username, password) {
    this.openLoginModal();
    this.fillCredentials(username, password);
    this.submitLogin();
  }

  /**
   * Performs a login submission with credentials expected to fail.
   *
   * @param {string} username - The invalid username to submit.
   * @param {string} password - The invalid password to submit.
   * @returns {void}
   */
  loginAsInvalidUser(username, password) {
    this.openLoginModal();
    this.fillCredentials(username, password);
    this.submitLogin();
  }

  /**
   * Logs in and verifies that the UI reflects the expected authenticated user.
   *
   * @param {string} username - The username expected after login.
   * @param {string} password - The password to submit.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  loginAndVerify(username, password) {
    this.login(username, password);
    return this.verifyLoggedIn(username);
  }

  /**
   * Ensures the demo user is authenticated on the home page.
   *
   * Reuses a valid existing session when possible, and normalizes stale or partial
   * authenticated UI state before logging in again.
   *
   * @returns {Cypress.Chainable<boolean | JQuery<HTMLElement>>}
   */
  loginAsDemoUser() {
    const { username, password } = getDemoUserCredentials();

    cy.visit(routes.home);

    return this.hasValidSession(username).then((hasValidSession) => {
      if (hasValidSession) {
        return true;
      }

      return this.logoutIfNeeded().then(() => this.loginAndVerify(username, password));
    });
  }
}
