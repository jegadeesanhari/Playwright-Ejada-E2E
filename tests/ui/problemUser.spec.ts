/* 
import { test, expect } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';
import checkoutData from '../../test-data/checkoutData.json';

test('Problem User - Reproduce Last Name Field Defect', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage
}) => {

  await test.step('Login with problem user', async () => {
    await loginPage.openApplication();

    await loginPage.login(
      getEnv('PROBLEM_USER'),
      getEnv('PASSWORD')
    );

    await inventoryPage.verifyInventoryPage();
  });

  await test.step('Add product and proceed to checkout', async () => {
    await inventoryPage.addProductToCart(
      checkoutData.product.name
    );

    await inventoryPage.openCart();

    await cartPage.verifyCartProduct(
      checkoutData.product.name
    );

    await cartPage.proceedToCheckout();
  });

  await test.step('Enter customer information', async () => {
    await checkoutInformationPage.enterFirstName(
      checkoutData.customer.firstName
    );

    await checkoutInformationPage.enterLastName(
      checkoutData.customer.lastName
    );

    await checkoutInformationPage.enterPostalCode(
      checkoutData.customer.postalCode
    );
  });

  await test.step('Verify last name field is unexpectedly empty', async () => {
    expect(
      await checkoutInformationPage.getLastNameValue()
    ).toBe('');
  });

  await test.step('Verify checkout validation error', async () => {
    await checkoutInformationPage.continueCheckout();

    await checkoutInformationPage.verifyCheckoutError(
      'Error: Last Name is required'
    );
  });
});
 */


import { test, expect } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';
import checkoutData from '../../test-data/checkoutData.json';

test('TC-03 | Problem User - Reproduce Last Name Field Defect', {
  annotation: [
    {
      type: 'description',
      description: 'Reproduce the known defect where the Last Name field fails to retain customer input, preventing checkout.'
    },
    {
      type: 'testType',
      description: 'Known Defect Reproduction'
    }
  ]
}, async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage
}, testInfo) => {

  await test.step('Login as Problem User', async () => {
    await loginPage.openApplication();

    await loginPage.login(
      getEnv('PROBLEM_USER'),
      getEnv('PASSWORD')
    );

    await inventoryPage.verifyInventoryPage();
  });

  await test.step('Add Backpack to cart and proceed to checkout', async () => {
    await inventoryPage.addProductToCart(
      checkoutData.product.name
    );

    await inventoryPage.openCart();

    await cartPage.verifyCartProduct(
      checkoutData.product.name
    );

    await cartPage.proceedToCheckout();
  });

  await test.step('Enter customer information and inspect Last Name field', async () => {
    await checkoutInformationPage.enterCustomerDetails(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode
    );

    const actualLastName =
      await checkoutInformationPage.getLastNameValue();

    await testInfo.attach('Last Name Field Validation', {
      body: [
        `Entered Last Name: ${checkoutData.customer.lastName}`,
        `Actual Last Name field value: "${actualLastName}"`,
        'Expected defect behavior: Last Name field remains empty',
        `Defect reproduced: ${actualLastName === ''}`,
        'Business impact: Customer cannot provide valid checkout details'
      ].join('\n'),
      contentType: 'text/plain'
    });

    expect(
      actualLastName,
      'Known defect: Last Name field should remain empty'
    ).toBe('');
  });

  await test.step(
    'Verify checkout displays "Error: Last Name is required"',
    async () => {

      await checkoutInformationPage.continueCheckout();

      await checkoutInformationPage.verifyCheckoutError(
        'Error: Last Name is required'
      );

      await testInfo.attach('Checkout Error Validation', {
        body: [
          'Expected error: Error: Last Name is required',
          'Actual result: Expected error assertion passed',
          'Business outcome: Customer is prevented from completing checkout',
          'Scenario classification: Known defect reproduced'
        ].join('\n'),
        contentType: 'text/plain'
      });
    }
  );
});
