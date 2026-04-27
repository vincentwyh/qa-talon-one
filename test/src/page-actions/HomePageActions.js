import HomePage from '../page-objects/HomePage';

/**
 * Groups reusable interactions available from the Demoblaze home page.
 */
export default class HomePageActions {
  constructor() {
    this.homePage = new HomePage();
  }

  /**
   * Opens a product category from the left-side category list.
   *
   * @param {string} categoryName - The category label to open.
   * @returns {void}
   */
  navigateToCategory(categoryName) {
    cy.get(this.homePage.selectors.links.category).contains(categoryName).click();
  }

  /**
   * Opens a product details page from the current product grid.
   *
   * @param {string} productName - The product card title to open.
   * @returns {void}
   */
  selectProduct(productName) {
    cy.get(this.homePage.selectors.links.product).contains(productName).click();
  }
}
