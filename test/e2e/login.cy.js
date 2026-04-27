import loginData from '@fixtures/loginData.json';
import { loginPage } from '@page-actions';
import { common } from '@step-objects';
import { routes } from '@test-data/routes';

describe('Login Tests', () => {
  beforeEach(() => {
    common.navigateTo(routes.home);
  });

  it('User can login with valid credentials', () => {
    loginPage.loginAsDemoUser();
  });

  it('User sees error for invalid credentials', () => {
    const { invalidUser } = loginData;

    loginPage.captureLoginAlert();
    loginPage.openLoginModal();
    loginPage.fillCredentials(invalidUser.username, invalidUser.password);
    loginPage.submitLogin();
    loginPage.verifyLoginAlert(invalidUser.errorMessage);
  });
});
