import purchaseData from '@fixtures/purchaseData.json';
import { cartPage, homePage, loginPage, productPage } from '@page-actions';

describe('Purchase Flow Tests', () => {
  beforeEach(() => {
    loginPage.loginAsDemoUser();
  });

  it('User can complete purchase of a laptop', () => {
    homePage.navigateToCategory(purchaseData.category);
    homePage.selectProduct(purchaseData.productName);
    productPage.captureAddToCartAlert();
    productPage.addToCart();
    productPage.verifyAddToCartAlert();
    cartPage.openCart();
    cartPage.verifyProductInCart(purchaseData.productName);
    cartPage.placeOrder(purchaseData.orderDetails);
    cartPage.verifyPurchaseSuccess();
    cartPage.verifyPurchaseDetailsContain(purchaseData.orderDetails.name);
  });
});
