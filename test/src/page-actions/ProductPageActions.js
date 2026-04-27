import ProductPage from '@page-objects/ProductPage';

/**
 * Handles actions performed on an individual product details page.
 */
export default class ProductPageActions {
  constructor() {
    this.productPage = new ProductPage();
    this.alertAlias = 'addToCartAlert';
  }

  /**
   * Adds the currently viewed product to the cart.
   *
   * @returns {void}
   */
  addToCart() {
    cy
      .get(this.productPage.selectors.buttons.addToCart)
      .contains('Add to cart')
      .click();
  }
}
