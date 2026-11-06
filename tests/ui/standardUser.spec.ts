
import { test,expect } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';
import checkoutData from '../../test-data/checkoutData.json';

/* test('Standard User - Complete Product Purchase', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage
}) => {

  await test.step('Login with standard user', async () => {
    await loginPage.openApplication();

    await loginPage.login(
      getEnv('STANDARD_USER'),
      getEnv('PASSWORD')
    );

    await inventoryPage.verifyInventoryPage();
  });

  await test.step('Add Backpack to cart', async () => {
    await inventoryPage.addProductToCart(
      checkoutData.product.name
    );

    await inventoryPage.openCart();
  });

  await test.step('Verify cart and proceed to checkout', async () => {
    await cartPage.verifyCartProduct(
      checkoutData.product.name
    );

    await cartPage.proceedToCheckout();
  });

  await test.step('Enter checkout information', async () => {
    await checkoutInformationPage.enterCustomerDetails(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode
    );

    await checkoutInformationPage.continueCheckout();
  });

  await test.step('Verify overview and finish order', async () => {
    await checkoutOverviewPage.verifyOverviewPage();
    await checkoutOverviewPage.finishOrder();
  });

  await test.step('Verify order confirmation', async () => {
    await checkoutCompletePage.verifyOrderCompletion();
  });

  await test.step('Return home and logout', async () => {
    await checkoutCompletePage.backToProducts();
    await inventoryPage.logout();
    await loginPage.verifyLoginPage();
  });
});
 */


test('TC-01 | Standard User - Complete Product Purchase', {
  annotation: [
    {
      type: 'description',
      description: 'Verify that a standard customer can login, add a product to cart, complete checkout, and receive order confirmation.'
    },
    {
      type: 'testType',
      description: 'Positive End-to-End Functional Test'
    }
  ]
}, async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage
}, testInfo) => {

  await test.step('Login as Standard User and verify inventory page', async () => {
    await loginPage.openApplication();

    await loginPage.login(
      getEnv('STANDARD_USER'),
      getEnv('PASSWORD')
    );

    await inventoryPage.verifyInventoryPage();
  });

  await test.step(
    `Add ${checkoutData.product.name} to cart`,
    async () => {
      await inventoryPage.addProductToCart(
        checkoutData.product.name
      );

      await inventoryPage.openCart();

      await cartPage.verifyCartProduct(
        checkoutData.product.name
      );
    }
  );

  await test.step('Proceed to checkout and enter customer information', async () => {
    await cartPage.proceedToCheckout();

    await checkoutInformationPage.enterCustomerDetails(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode
    );

    await checkoutInformationPage.continueCheckout();
  });

  await test.step('Verify checkout overview and complete purchase', async () => {
    await checkoutOverviewPage.verifyOverviewPage();
    await checkoutOverviewPage.finishOrder();
  });

  await test.step('Verify successful order confirmation', async () => {
    await checkoutCompletePage.verifyOrderCompletion();

    await testInfo.attach('Order Completion Validation', {
      body: [
        `Product: ${checkoutData.product.name}`,
        `Customer: ${checkoutData.customer.firstName} ${checkoutData.customer.lastName}`,
        'Expected result: Order confirmation page is displayed',
        'Expected message: Thank you for your order!',
        'Actual result: Order confirmation assertions passed',
        'Business outcome: Customer successfully completed the purchase'
      ].join('\n'),
      contentType: 'text/plain'
    });
  });

  await test.step('Return to inventory and logout', async () => {
    await checkoutCompletePage.backToProducts();

    await inventoryPage.logout();

    await loginPage.verifyLoginPage();

    expect(
      testInfo.status,
      'Test should still be running before final completion'
    ).toBe('passed');
  });
});
