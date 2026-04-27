import ProductPage from '@page-objects/ProductPage';

export default class ProductPageActions {
  constructor() {
    this.productPage = new ProductPage();
    this.alertAlias = 'addToCartAlert';
  }

  captureAddToCartAlert() {
    return cy.window().then((win) => {
      cy.stub(win, 'alert').as(this.alertAlias);
    });
  }

  addToCart() {
    return cy
      .get(this.productPage.selectors.buttons.addToCart)
      .contains('Add to cart')
      .click();
  }

  verifyAddToCartAlert() {
    return cy
      .get(`@${this.alertAlias}`)
      .should('have.been.calledOnceWithExactly', 'Product added.');
  }
}
