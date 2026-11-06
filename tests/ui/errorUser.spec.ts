/* 
import { test } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';
import checkoutData from '../../test-data/checkoutData.json';

test('Detect error user checkout finish defect', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage
}) => {

  await loginPage.openApplication();

  await loginPage.login(
    getEnv('ERROR_USER'),
    getEnv('PASSWORD')
  );

  await inventoryPage.verifyInventoryPage();

  await inventoryPage.addProductToCart(
    checkoutData.product.name
  );

  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutInformationPage.enterCustomerDetails(
    checkoutData.customer.firstName,
    checkoutData.customer.lastName,
    checkoutData.customer.postalCode
  );

  await checkoutInformationPage.continueCheckout();

  await checkoutOverviewPage.verifyOverviewPage();

  await checkoutOverviewPage.finishOrder();

  await checkoutOverviewPage.verifyOrderNotCompleted();
});
 */


import { test, expect } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';
import checkoutData from '../../test-data/checkoutData.json';

test('TC-04 | Error User - Reproduce Checkout Completion Defect', {
  annotation: [
    {
      type: 'description',
      description: 'Verify the known defect where clicking the enabled Finish button does not complete the purchase.'
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
  checkoutInformationPage,
  checkoutOverviewPage
}, testInfo) => {

  await test.step('Login as Error User', async () => {
    await loginPage.openApplication();

    await loginPage.login(
      getEnv('ERROR_USER'),
      getEnv('PASSWORD')
    );

    await inventoryPage.verifyInventoryPage();
  });

  await test.step('Add Backpack and proceed to checkout', async () => {
    await inventoryPage.addProductToCart(
      checkoutData.product.name
    );

    await inventoryPage.openCart();

    await cartPage.verifyCartProduct(
      checkoutData.product.name
    );

    await cartPage.proceedToCheckout();
  });

  await test.step('Enter checkout customer details', async () => {
    await checkoutInformationPage.enterCustomerDetails(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode
    );

    await checkoutInformationPage.continueCheckout();
  });

  await test.step('Verify Checkout Overview page is displayed', async () => {
    await checkoutOverviewPage.verifyOverviewPage();
  });

  await test.step('Click enabled Finish button', async () => {
    await checkoutOverviewPage.finishOrder();
  });

  await test.step(
    'Verify order remains incomplete after clicking Finish',
    async () => {

      await checkoutOverviewPage.verifyOrderNotCompleted();

      await testInfo.attach('Checkout Completion Defect', {
        body: [
          'User type: error_user',
          'Action: Click Finish on Checkout Overview',
          'Expected correct behavior: Order confirmation is displayed',
          'Expected defect behavior: User remains on Checkout Overview',
          'Actual result: Order remains incomplete assertion passed',
          'Business impact: Customer cannot successfully place an order',
          'Scenario classification: Known defect reproduced'
        ].join('\n'),
        contentType: 'text/plain'
      });
    }
  );
});
