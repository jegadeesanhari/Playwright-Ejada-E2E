
import { test, expect } from '../../fixtures/testFixtures';
import { getEnv } from '../../utils/env';
import checkoutData from '../../test-data/checkoutData.json';

test('TC-05 | Visual User - Product Price Discrepancy', {
  annotation: [
    {
      type: 'description',
      description: 'Verify the known defect where the Backpack price differs from the reference price.'
    },
    {
      type: 'testType',
      description: 'Known defect reproduction'
    }
  ]
}, async ({
  loginPage,
  inventoryPage
}, testInfo) => {

  await test.step('Login as Visual User', async () => {
    await loginPage.openApplication();

    await loginPage.login(
      getEnv('VISUAL_USER'),
      getEnv('PASSWORD')
    );

    await inventoryPage.verifyInventoryPage();
  });

  await test.step('Verify Backpack price discrepancy', async () => {

    const actualPrice = await inventoryPage.getProductPrice(
      checkoutData.product.name
    );

    const expectedPrice = checkoutData.product.expectedPrice;

    await testInfo.attach('Product Price Validation', {
      body: [
        `Product: ${checkoutData.product.name}`,
        `Reference price: ${expectedPrice}`,
        `Displayed price: ${actualPrice}`,
        `Defect reproduced: ${actualPrice !== expectedPrice}`
      ].join('\n'),
      contentType: 'text/plain'
    });

    expect(
      actualPrice,
      `Displayed price (${actualPrice}) should differ from reference price (${expectedPrice})`
    ).not.toBe(expectedPrice);
  });
});
