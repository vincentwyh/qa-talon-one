import { cartPage, homePage, loginPage, productPage } from '@page-actions';
import { routes } from '@test-data/routes';
import { generatePurchaseData } from '@helpers/purchaseDataGenerator';

describe('Purchase Flow Tests', () => {
  beforeEach(() => {
    cy.session('demoUserSession', () => {
      loginPage.loginAsDemoUser();
      cy.visit(routes.home);
    });
    cy.visit(routes.home);
  });

  it('User can complete purchase of a laptop', () => {
    const dynamicOrder = generatePurchaseData();

    homePage.navigateToCategory(dynamicOrder.category);
    homePage.selectProduct(dynamicOrder.productName);
    productPage.addToCart();
    cartPage.openCart();
    cartPage.verifyProductInCart(dynamicOrder.productName);
    cartPage.placeOrder(dynamicOrder.orderDetails);
    cartPage.verifyPurchaseSuccess();
    cartPage.verifyPurchaseDetailsContain(dynamicOrder.orderDetails.name);
  });
});
