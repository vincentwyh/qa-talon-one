/**
 * Centralizes selectors used on the cart page and purchase modal.
 */
export default class CartPage {
  selectors = {
    links: {
      cart: '#cartur',
    },
    rows: {
      cartItem: '.success',
    },
    buttons: {
      placeOrder: '.btn-success',
      submitOrder: '#orderModal .btn-primary',
    },
    fields: {
      name: '#name',
      country: '#country',
      city: '#city',
      card: '#card',
      month: '#month',
      year: '#year',
    },
    texts: {
      purchaseConfirmation: '.sweet-alert h2',
      purchaseDetails: '.sweet-alert p',
    },
  };
}
