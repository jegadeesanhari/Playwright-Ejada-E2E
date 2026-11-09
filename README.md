# Playwright Ejada E2E Automation Framework

A hybrid UI and API test automation framework developed using **Playwright and TypeScript** for the Ejada Senior Automation Tester assessment.

## Technologies Used
- Playwright with TypeScript
- Page Object Model (POM)
- REST API Testing
- Allure Reporting
- GitHub Actions CI/CD

## Test Coverage

**UI Testing — SauceDemo**
- Login scenarios
- Product selection and checkout
- Cross-browser testing using Chromium and Firefox

**API Testing — Simple Books API**
- GET — Retrieve books and orders
- POST — Register API client and create orders
- PATCH — Update orders
- DELETE — Delete orders
- Positive and negative test scenarios

## Run Tests

Install dependencies:
```bash
npm install
```

Run all UI and API tests:
```bash
npx playwright test
```

Run only UI tests:
```bash
npx playwright test --project=chromium --project=firefox
```

Run only API tests:
```bash
npx playwright test --project=api
```

## Reports

Tests generate Allure reports, which are published automatically through GitHub Actions.

**[View Allure Test Report](https://jegadeesanhari.github.io/Playwright-Ejada-E2E/)**

## CI/CD

GitHub Actions automatically executes the test suite and publishes the latest Allure report to GitHub Pages.