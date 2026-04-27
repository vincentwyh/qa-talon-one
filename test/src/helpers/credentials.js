import { authEnvKeys } from '@test-data/auth-env-keys';

/**
 * Reads the demo account credentials from Cypress environment variables and
 * returns them in the shape expected by the login helpers.
 *
 * Throws early when either value is missing so the test fails with a clear
 * setup error instead of timing out later in the login flow.
 *
 * @returns {{ username: string, password: string }}
 */
export function getDemoUserCredentials() {
  const username = Cypress.env(authEnvKeys.username);
  const password = Cypress.env(authEnvKeys.password);

  if (!username || !password) {
    throw new Error(
      `Missing demo credentials. Configure ${authEnvKeys.username} and ${authEnvKeys.password} in cypress.env.json or your environment.`,
    );
  }

  return { username, password };
}
