/**
 * Small reusable actions that are not tied to one specific page.
 *
 * This class keeps common Cypress interactions in one place so specs can stay
 * focused on the user flow rather than low-level DOM commands.
 */
export default class CommonActions {
  /**
   * Opens a route relative to the configured Cypress base URL.
   *
   * @param {string} route
   */
  navigateTo(route) {
    cy.visit(route);
  }
}
