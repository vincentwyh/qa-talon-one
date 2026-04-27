import { faker } from '@faker-js/faker';

/**
 * Generates realistic checkout data for purchase flow coverage while keeping the
 * tested product selection stable.
 *
 * @returns {{category: string, productName: string, orderDetails: {name: string, country: string, city: string, card: string, month: number, year: string}}}
 */
export const generatePurchaseData = () => ({
  category: 'Laptops',
  productName: 'MacBook air',
  orderDetails: {
    name: faker.person.fullName(),
    country: faker.location.country(),
    city: faker.location.city(),
    card: faker.finance.creditCardNumber(),
    month: faker.date.future().getMonth() + 1,
    year: (faker.date.future().getFullYear() + 1).toString(),
  },
});
