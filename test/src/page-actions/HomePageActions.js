import HomePage from '../page-objects/HomePage';

export default class HomePageActions {
  constructor() {
    this.homePage = new HomePage();
  }

  navigateToCategory(categoryName) {
    return cy.get(this.homePage.selectors.links.category).contains(categoryName).click();
  }

  selectProduct(productName) {
    return cy.get(this.homePage.selectors.links.product).contains(productName).click();
  }
}
