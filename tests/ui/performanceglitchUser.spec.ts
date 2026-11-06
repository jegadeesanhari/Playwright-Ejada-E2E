/* 
import { test } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';

test('Performance Glitch User - Verify Login Despite Delay', async ({
  loginPage,
  inventoryPage
}) => {

  test.setTimeout(60000);

  await test.step('Open SauceDemo application', async () => {
    await loginPage.openApplication();
  });

  const startTime = performance.now();

  await test.step('Login with performance glitch user', async () => {
    await loginPage.login(
      getEnv('PERFORMANCE_GLITCH_USER'),
      getEnv('PASSWORD')
    );
  });

  await test.step('Verify successful navigation', async () => {
    //await inventoryPage.verifyInventoryPage(30000);
    await inventoryPage.verifyProductsDisplayed();
  });

  const loginDuration = performance.now() - startTime;

  await test.step('Record login duration', async () => {
    console.log(
      `Performance glitch login duration: ${loginDuration.toFixed(2)} ms`
    );
  });
});
 */


import { test, expect } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';

test('TC-06 | Performance Glitch User - Verify Delayed Login', {
  annotation: [
    {
      type: 'description',
      description: 'Verify that the customer can successfully login despite delayed application response and record the login duration.'
    },
    {
      type: 'testType',
      description: 'Performance-Related Functional Validation'
    }
  ]
}, async ({
  loginPage,
  inventoryPage
}, testInfo) => {

  test.setTimeout(60000);

  await test.step('Open SauceDemo application', async () => {
    await loginPage.openApplication();
  });

  const startTime = performance.now();

  await test.step('Login using Performance Glitch account', async () => {
    await loginPage.login(
      getEnv('PERFORMANCE_GLITCH_USER'),
      getEnv('PASSWORD')
    );
  });

  await test.step('Verify inventory page loads successfully', async () => {
    //await inventoryPage.verifyInventoryPage(30000);
    await inventoryPage.verifyProductsDisplayed();
  });

  const loginDuration = performance.now() - startTime;

  await test.step(
    `Record successful login duration: ${loginDuration.toFixed(2)} ms`,
    async () => {

      await testInfo.attach('Login Performance Validation', {
        body: [
          'User type: performance_glitch_user',
          'Expected result: Login succeeds despite delayed response',
          'Actual result: Inventory page and products verified',
          `Measured login duration: ${loginDuration.toFixed(2)} ms`,
          'Business outcome: Customer can access products after login',
          'Note: Measurement includes UI interaction and navigation'
        ].join('\n'),
        contentType: 'text/plain'
      });
    }
  );
});
