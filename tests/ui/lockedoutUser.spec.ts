
// import { test,expect } from '../../fixtures/testFixtures';
// import { getEnv } from '../../utils/env';

/* test('Locked Out User - Verify Login Rejection', async ({
  loginPage
}) => {

  await test.step('Open SauceDemo login page', async () => {
    await loginPage.openApplication();
  });

  await test.step('Attempt login with locked out user', async () => {
    await loginPage.login(
      getEnv('LOCKED_OUT_USER'),
      getEnv('PASSWORD')
    );
  });

  await test.step('Verify locked out error message', async () => {
    await loginPage.verifyLoginError(
      'Epic sadface: Sorry, this user has been locked out.'
    );

    await loginPage.verifyLoginPage();
  });
}); */




import { test, expect } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';

test('TC-02 | Locked Out User - Verify Login Rejection', {
  annotation: [
    {
      type: 'description',
      description:
        'Verify that a locked-out customer cannot access the application ' +
        'and receives the correct error message.'
    },
    {
      type: 'testType',
      description: 'Negative Login Validation'
    }
  ]
}, async ({ loginPage }, testInfo) => {

  const expectedError =
    'Epic sadface: Sorry, this user has been locked out.';

  await test.step('Open SauceDemo login page', async () => {
    await loginPage.openApplication();
    await loginPage.verifyLoginPage();
  });

  await test.step('Attempt login using locked-out account', async () => {
    await loginPage.login(
      getEnv('LOCKED_OUT_USER'),
      getEnv('PASSWORD')
    );
  });

  await test.step('Verify locked-out login error message', async () => {

    // Retrieve actual error message from UI
    const actualError = await loginPage.getLoginErrorText();

    // Attach expected and actual values to the report
    await testInfo.attach('Login Error Comparison', {
      body: [
        'User: locked_out_user',
        'Scenario: Login rejection validation',
        `Expected: ${expectedError}`,
        `Actual: ${actualError}`,
        `Result: ${actualError === expectedError ? 'Matched' : 'Mismatched'}`
      ].join('\n'),
      contentType: 'text/plain'
    });

    // Validate exact error message
    expect(
      actualError,
      'Locked-out user should receive the expected error message'
    ).toBe(expectedError);

    // Verify user remains on login page
    await loginPage.verifyLoginPage();
  });
});
