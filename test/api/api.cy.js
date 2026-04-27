import { api } from '@test-data';

describe('API Tests', () => {
  it('User can fetch products from API', () => {
    cy.request('GET', `${api.baseUrl}${api.endpoints.entries}`).then((response) => {
      expect(response.status).to.eq(api.statusCodes.ok);
      expect(response.body).to.have.property('Items');
      expect(response.body.Items).to.be.an('array');
    });
  });
});