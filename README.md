# QA Challenge - Demoblaze Cypress Tests

This repository contains automated tests for [Demoblaze](https://www.demoblaze.com) using Cypress.

The suite focuses on the core user journeys that matter most in a small e-commerce app:

- valid login
- invalid login handling
- laptop purchase flow
- basic API coverage

## Overview

The project uses a layered structure to keep specs readable and easy to maintain:

- `page-objects` store selectors
- `page-actions` store reusable user interactions
- `helpers` store shared test utilities
- `fixtures` and `test-data` store reusable inputs and constants

This keeps test files focused on behavior instead of low-level Cypress commands.

## Tech Stack

- [Cypress](https://www.cypress.io/)
- JavaScript
- ESLint
- Mochawesome reporter

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- a Demoblaze account created manually at [https://www.demoblaze.com](https://www.demoblaze.com)

This project is currently configured with Cypress `14.5.4`.

## Setup

### 1. Clone the repository

```bash
git clone <your-github-repo-url>
cd qa-talon-one
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure credentials

Copy the example file:

```bash
cp cypress.env.example.json cypress.env.json
```

Then add your real Demoblaze credentials:

```json
{
  "DEMO_USER_NAME": "your_username_here",
  "DEMO_USER_PASSWORD": "your_password_here"
}
```

`cypress.env.json` is ignored by Git and should not be committed.

## Running Tests

### Run the full suite

```bash
npm test
```

### Open Cypress interactively

```bash
npm run cypress:open
```

### Run in a specific browser

```bash
npm run test:electron
npm run test:chrome
npm run test:firefox
```

Important:
- `test:firefox` works only if Firefox is installed and detected on your machine.
- If Cypress says Firefox was not found, install Firefox first or use `chrome` or `electron`.

### Run headed

```bash
npm run test:headed
npm run test:chrome:headed
```

### Run one spec

```bash
npm run test:spec -- test/e2e/login.cy.js
npm run test:spec -- test/e2e/purchase.cy.js
npm run test:spec -- test/api/api.cy.js
```

### Run with full Cypress output

```bash
npm run test:debug
```

### Generate the HTML report

```bash
npm run test:report
```

This command runs the suite, generates the Mochawesome HTML report, and opens it automatically.

### Clean generated artifacts

```bash
npm run clean
```

This removes:

- `test-results/`
- `.cypress/`

## Project Structure

```text
.
├── cypress.config.js
├── cypress.env.example.json
├── package.json
├── test
│   ├── api
│   │   └── api.cy.js
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
```

## Configuration

Main runtime configuration lives in [cypress.config.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/cypress.config.js:1).

Notable settings:

- `baseUrl`: `https://www.demoblaze.com`
- `specPattern`: runs both UI specs and API specs
- webpack aliases such as `@page-actions`, `@helpers`, and `@test-data`
- screenshots and videos stored under `test-results/`
- retries enabled in CI only

### Environment keys

The login helper reads these values:

- `DEMO_USER_NAME`
- `DEMO_USER_PASSWORD`

They are defined in [test/src/test-data/auth-env-keys.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/auth-env-keys.js:1) and validated by [test/src/helpers/credentials.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/helpers/credentials.js:1).

## Shared Test Data

The `test/src/test-data/` folder contains shared constants:

- [routes.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/routes.js:1) for routes
- [timeouts.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/timeouts.js:1) for reusable wait values
- [auth-env-keys.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/auth-env-keys.js:1) for credential key names
- [api.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/src/test-data/api.js:1) for API constants

## Test Coverage

### UI coverage

[test/e2e/login.cy.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/e2e/login.cy.js:1)

- user can log in with valid credentials
- user cannot log in with invalid credentials

[test/e2e/purchase.cy.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/e2e/purchase.cy.js:1)

- user logs in
- user opens the laptop category
- user selects a product
- user adds it to the cart
- user completes checkout
- user sees purchase confirmation

### API coverage

[test/api/api.cy.js](/Users/vincent/Desktop/Document/Project/qa-talon-one/test/api/api.cy.js:1)

- fetches products from the Demoblaze API
- verifies status code and response structure

## GitHub Actions

A CI workflow is included at [.github/workflows/cypress.yml](/Users/vincent/Desktop/Document/Project/qa-talon-one/.github/workflows/cypress.yml:1).

It will:

- install dependencies
- create `cypress.env.json` from repository secrets
- run the suite in Chrome, Firefox, and Electron
- upload `test-results/` as an artifact

Required repository secrets:

- `DEMO_USER_NAME`
- `DEMO_USER_PASSWORD`

Note:
- the GitHub runner includes more browsers than your local machine may have
- local `test:firefox` can fail if Firefox is not installed on your Mac, even though CI can still run it

## Notes

- Credentials are intentionally kept outside source control.
- The suite favors readable flows over overly abstract helpers.
- Some test data is generated dynamically to reduce repeated static inputs during checkout.

## AI Usage Disclosure

AI tools were used to assist with code generation, refactoring, and documentation. The test strategy, structure, and final review decisions were still made by the developer.
