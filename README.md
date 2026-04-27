# QA Challenge - Demoblaze Cypress E2E Tests

This repository contains end-to-end tests for [Demoblaze](https://www.demoblaze.com), built with Cypress as part of a QA engineering challenge.

## Project Overview

The scope of this assignment focuses on the most essential user journeys under a tight delivery timeline:

- Login with a valid account
- Validation of an invalid login attempt
- Purchase flow for buying a laptop

## Approach to Testing

### What Was Considered Essential and Why
The tests prioritize the core e-commerce user journeys that directly impact revenue and user experience:
- **Login**: Authentication is fundamental; without it, users can't access personalized features or complete purchases.
- **Invalid Login Handling**: Ensures security and proper error messaging, preventing user frustration.
- **Purchase Flow**: The complete buying process (browse → add to cart → checkout) is the primary business goal.

These were chosen as "essential" because they cover the minimum viable customer path in an e-commerce site. Non-essential features (e.g., user registration, product reviews) were deferred to meet the 3-day deadline.

### Test Design and Why
- **Page Object Model**: Used page-objects for locators and page-actions for behaviors to keep tests readable, maintainable, and DRY (Don't Repeat Yourself). This design allows easy updates if the UI changes.
- **Data-Driven Tests**: Fixtures (JSON files) separate test data from code, making tests flexible and environment-agnostic.
- **Environment Variables**: Credentials are stored securely in `cypress.env.json` (not committed), promoting security best practices.
- **Behavior-Driven Naming**: Test titles like "User can login with valid credentials" focus on user outcomes, improving readability.
- **Modular Structure**: Organized into `e2e/` (tests) and `src/` (support code: page-objects, actions, helpers), following QA best practices for scalability.

## Tech Stack

- [Cypress](https://www.cypress.io/) for end-to-end browser automation
- JavaScript
- ESLint for code quality
- Mochawesome for test reporting

## Prerequisites

Before running the project, make sure you have:

- Node.js installed (version 14 or higher)
- npm installed
- A Demoblaze account created manually on [https://www.demoblaze.com](https://www.demoblaze.com)

This project was validated with Cypress 13.x and Node.js 24.x.

## Setup (Step-by-Step for Beginners)

If you've never set up a Cypress project, follow these steps exactly.

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd qa-talon-one
```

### 2. Install Dependencies

```bash
npm install
```

This downloads all required packages (Cypress, ESLint, etc.).

### 3. Create a Demoblaze Account

- Visit [https://www.demoblaze.com](https://www.demoblaze.com).
- Click "Sign up" and create an account.
- Note your username and password—you'll need them for tests.

### 4. Configure Credentials

Tests use environment variables for security. Copy the example file:

```bash
cp cypress.env.example.json cypress.env.json
```

Edit `cypress.env.json` with your real credentials:

```json
{
  "DEMO_USER_NAME": "your_username_here",
  "DEMO_USER_PASSWORD": "your_password_here"
}
```

**Important**:
- `cypress.env.json` is ignored by Git—never commit real credentials.
- For CI (e.g., GitHub Actions), use repository secrets.

### 5. Understand the Environment Keys

The credential keys are defined in [test/src/test-data/auth-env-keys.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/auth-env-keys.js:1):

- `DEMO_USER_NAME`
- `DEMO_USER_PASSWORD`

The helper at [test/src/helpers/credentials.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/helpers/credentials.js:1) reads those values and fails fast with a clear error if either one is missing. This helps avoid confusing login timeouts caused by incomplete local setup.

## How to Run the Tests

### Run All Tests (Recommended)

```bash
npm test
```

This runs tests in headless mode with clean output.

### Run in Interactive Mode

```bash
npm run cypress:open
```

Opens Cypress GUI for debugging individual tests.

### Run on Specific Browsers

```bash
npm run test:electron
npm run test:chrome
npm run test:firefox
```

Useful for cross-browser validation.

### Generate Reports


```bash
npm run test:report
```

## Project Structure

```
test/
├── api/                 # API specs
├── e2e/                 # UI specs
└── src/                 # Support code
    ├── fixtures/        # Test data files
    ├── helpers/         # Utilities
    ├── page-actions/    # Behavior classes
    ├── page-objects/    # Locator classes
    ├── step-objects/    # Common actions
    ├── support/         # Cypress setup
    └── test-data/       # Shared constants
```

## Configuration Reference

### Cypress configuration

Main runtime configuration lives in [cypress.config.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/cypress.config.js:1).

It defines:

- the Demoblaze `baseUrl`
- webpack aliases such as `@page-actions` and `@test-data`
- timeouts, viewport, retries, screenshots, and report behavior

### Environment files

- `cypress.env.example.json`: template file for local setup
- `cypress.env.json`: your local uncommitted credentials

### Shared test constants

The `test/src/test-data/` folder contains reusable configuration used across the suite:

- [routes.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/routes.js:1) for page routes
- [timeouts.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/timeouts.js:1) for wait-related constants such as `shortWait` and `typingDelay`
- [auth-env-keys.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/auth-env-keys.js:1) for environment variable names
- [api.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/api.js:1) for Demoblaze API constants

## API Reference

The project currently keeps API-related constants in [test/src/test-data/api.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/api.js:1).

Current values:

- `baseUrl`: `https://api.demoblaze.com`
- `endpoints.entries`: `/entries`
- `statusCodes.ok`: `200`

This is intentionally lightweight for now, but it gives API-oriented tests a single place to read base URLs, endpoints, and expected status codes from instead of hardcoding them in specs.

## AI Tool Usage Disclosure

AI tools (GitHub Copilot) were used to assist with code generation, refactoring, and documentation. The overall test strategy, structure, and logic were designed by the developer, with AI providing implementation suggestions and best-practice guidance.

### Run tests with full debug output

```bash
npm run test:debug
```

Use this if you want to see the full Cypress console output for troubleshooting.

### Clean generated artifacts

```bash
npm run clean
```

This removes generated local residue such as:

- `test-results/`
- `.cypress/`

### Open Cypress interactively

```bash
npm run cypress:open
```

This is useful when:

- debugging selectors
- watching the test step by step
- exploring failures visually

### Run headed

```bash
npm run test:headed
```

Browser-specific headed runs are also available:

```bash
npm run test:chrome:headed
```

### Run a single spec

```bash
npm run test:spec -- test/e2e/login.cy.js
```

or

```bash
npm run test:spec -- test/e2e/purchase.cy.js
```

### Run tests and open the HTML report

```bash
npm run test:report
```

This command:

1. runs the tests
2. generates the HTML report
3. opens the report automatically

The report file is generated at:

[test-results/reports/index.html](/Users/vincent/Desktop/Document/Project/qa-talon-one/test-results/reports/index.html:1)

## GitHub Actions

A basic CI workflow is included at [.github/workflows/cypress.yml](/Users/vincent/Desktop/Document/Project/qa-talon-one/.github/workflows/cypress.yml:1).

It will:

- install dependencies
- create `cypress.env.json` from repository secrets
- run the suite in Chrome, Firefox, and Electron
- upload `test-results/` as an artifact

Before enabling it, add these repository secrets:

- `DEMO_USER_NAME`
- `DEMO_USER_PASSWORD`

## Test Coverage

### 1. Login tests

File: [test/e2e/login.cy.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/e2e/login.cy.js:1)

Covered scenarios:

- successful login with a valid user
- error handling for invalid credentials

Why this is essential:

- login is a primary account access path
- invalid credential handling is a basic but important negative scenario

### 2. Purchase flow tests

File: [test/e2e/purchase.cy.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/e2e/purchase.cy.js:1)

Covered scenario:

- login
- navigate to laptop category
- select a product
- add product to cart
- verify the product is in cart
- place the order
- verify purchase confirmation
- verify the confirmation details include the buyer name

Why this is essential:

- it represents the core revenue path for the application
- it validates the main user journey from browsing to purchase success

## Test Design Approach

Given the challenge timeline, I prioritized breadth across the most important customer outcomes rather than trying to automate every edge case.

### What I considered essential

- authentication
- failed authentication feedback
- successful purchase of a laptop

These are the flows most likely to affect user trust and business value if broken.

### How the tests were designed

The suite uses a layered structure to keep the tests maintainable:

- `test/e2e/` contains the high-level scenarios
- `test/src/page-objects/` stores selectors
- `test/src/page-actions/` stores page-specific user interactions
- `test/src/step-objects/` stores reusable cross-page actions
- `test/src/helpers/` contains shared helper logic
- `test/src/fixtures/` stores scenario data loaded by Cypress

This keeps the spec files short and focused on behavior, while selectors and reusable actions are separated into dedicated modules.

## Project Structure

```text
.
├── cypress.config.js
├── cypress.env.example.json
├── test
│   ├── e2e
│   │   ├── login.cy.js
│   │   └── purchase.cy.js
│   └── src
│       ├── fixtures
│       ├── helpers
│       ├── page-actions
│       ├── page-objects
│       ├── step-objects
│       ├── support
│       └── test-data
└── test-results
```

## Notes And Assumptions

- The tests depend on a valid Demoblaze account.
- The purchase test assumes the configured product is available on the site.
- The suite runs against a public demo environment, so occasional third-party instability is possible.
- Generated reports, screenshots, and other run artifacts are stored under `test-results/`.
- The default `npm test` command hides noisy Electron/macOS console warnings to keep the output readable.
- The Cypress configuration includes CI-friendly retries and shared timeouts to make runs more stable across environments.

## Future Coverage

Given the assignment scope and timeline, I intentionally prioritized the most essential flows first instead of trying to automate every possible scenario.

If this suite were extended next, the highest-value additions would be:

- purchase behavior when the user is not logged in
- validation of checkout form behavior for missing required details
- cart persistence and cleanup behavior after purchase
- broader product coverage across categories beyond laptops

## AI Tool Usage Disclosure

AI tools were used as supporting tools during development, mainly for:

- brainstorming cleanup ideas
- reviewing structure and readability
- accelerating documentation and refactoring assistance

The final implementation, decisions, and submitted content were reviewed and shaped as part of the project work rather than copied as-is from generated output.
