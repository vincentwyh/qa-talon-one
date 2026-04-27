import CartPage from '@page-objects/CartPage';

/**
 * Encapsulates cart and checkout interactions so purchase specs can focus on
 * user intent instead of raw Cypress selectors.
 */
export default class CartPageActions {
  constructor() {
    this.cartPage = new CartPage();
  }

  /**
   * Opens the shopping cart page from the main navigation.
   *
   * @returns {void}
   */
  openCart() {
    cy.get(this.cartPage.selectors.links.cart).click();
  }

  /**
   * Verifies that the expected product is listed in the cart table.
   *
   * @param {string} productName - The product name expected in the cart.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  verifyProductInCart(productName) {
    return cy
      .get(this.cartPage.selectors.rows.cartItem)
      .should('contain', productName);
  }

  /**
   * Opens the checkout modal from the cart page.
   *
   * @returns {void}
   */
  openOrderForm() {
    cy
      .get(this.cartPage.selectors.buttons.placeOrder)
      .contains('Place Order')
      .click();
  }

  /**
   * Populates the purchase form with the supplied order data.
   *
   * @param {{name: string, country: string, city: string, card: string, month: string | number, year: string | number}} order
   *   The order details to type into the checkout form.
   * @returns {void}
   */
  fillOrderForm(order) {
    cy.get(this.cartPage.selectors.fields.name).clear();
    cy.get(this.cartPage.selectors.fields.name).type(order.name);
    cy.get(this.cartPage.selectors.fields.country).clear();
    cy.get(this.cartPage.selectors.fields.country).type(order.country);
    cy.get(this.cartPage.selectors.fields.city).clear();
    cy.get(this.cartPage.selectors.fields.city).type(order.city);
    cy.get(this.cartPage.selectors.fields.card).clear();
    cy.get(this.cartPage.selectors.fields.card).type(order.card);
    cy.get(this.cartPage.selectors.fields.month).clear();
    cy.get(this.cartPage.selectors.fields.month).type(order.month);
    cy.get(this.cartPage.selectors.fields.year).clear();
    cy.get(this.cartPage.selectors.fields.year).type(order.year);
  }

  /**
   * Submits the checkout form.
   *
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  submitOrder() {
    return cy.get(this.cartPage.selectors.buttons.submitOrder).click();
  }

  /**
   * Verifies that the purchase confirmation dialog appears.
   *
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  verifyPurchaseSuccess() {
    return cy
      .get(this.cartPage.selectors.texts.purchaseConfirmation)
      .should('contain', 'Thank you for your purchase!');
  }

  /**
   * Verifies that the purchase confirmation details include the expected text.
   *
   * @param {string} expectedText - Text expected inside the confirmation details.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  verifyPurchaseDetailsContain(expectedText) {
    return cy.get(this.cartPage.selectors.texts.purchaseDetails).should('contain', expectedText);
  }

  /**
   * Completes the full checkout form submission flow.
   *
   * @param {{name: string, country: string, city: string, card: string, month: string | number, year: string | number}} order
   *   The order details to submit.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  placeOrder(order) {
    this.openOrderForm();
    this.fillOrderForm(order);
    return this.submitOrder();
  }
}
