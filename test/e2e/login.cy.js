import loginData from '@fixtures/loginData.json';
import { loginPage } from '@page-actions';
import { common } from '@step-objects';
import { routes } from '@test-data/routes';

describe('Login Tests', () => {
  beforeEach(() => {
    common.navigateToDemoblaze(routes.home);
  });

  it('User can login with valid credentials', () => {
    loginPage.loginAsDemoUser();
  });

  it('User cannot login with invalid credentials', () => {
    const { invalidUser } = loginData;

    loginPage.loginAsInvalidUser(invalidUser.username, invalidUser.password);
    loginPage.verifyNotLoggedIn();
  });
});
