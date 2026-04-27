import CartPage from '@page-objects/CartPage';

export default class CartPageActions {
  constructor() {
    this.cartPage = new CartPage();
  }

  openCart() {
    return cy.get(this.cartPage.selectors.links.cart).click();
  }

  verifyProductInCart(productName) {
    return cy
      .get(this.cartPage.selectors.rows.cartItem)
      .should('contain', productName);
  }

  openOrderForm() {
    return cy
      .get(this.cartPage.selectors.buttons.placeOrder)
      .contains('Place Order')
      .click();
  }

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
    return cy.get(this.cartPage.selectors.fields.year).type(order.year);
  }

  submitOrder() {
    return cy.get(this.cartPage.selectors.buttons.submitOrder).click();
  }

  verifyPurchaseSuccess() {
    return cy
      .get(this.cartPage.selectors.texts.purchaseConfirmation)
      .should('contain', 'Thank you for your purchase!');
  }

  verifyPurchaseDetailsContain(expectedText) {
    return cy.get(this.cartPage.selectors.texts.purchaseDetails).should('contain', expectedText);
  }

  placeOrder(order) {
    return this.openOrderForm().then(() => this.fillOrderForm(order)).then(() => this.submitOrder());
  }
}
