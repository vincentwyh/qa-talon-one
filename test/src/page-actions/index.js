import LoginPageActions from './LoginPageActions';
import HomePageActions from './HomePageActions';
import ProductPageActions from './ProductPageActions';
import CartPageActions from './CartPageActions';

/**
 * Shared page-action singletons used across the Cypress test suite.
 */
export const loginPage = new LoginPageActions();
export const homePage = new HomePageActions();
export const productPage = new ProductPageActions();
export const cartPage = new CartPageActions();
