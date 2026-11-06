
// import { test, expect } from '@playwright/test';

// test('Verify complete product purchase workflow', async ({ page }) => {

//   // Step 1: Login
//   await page.goto('https://www.saucedemo.com/');

//   await page.getByPlaceholder('Username').fill('standard_user');
//   await page.getByPlaceholder('Password').fill('secret_sauce');
//   await page.getByRole('button', { name: 'Login' }).click();

//   await expect(page).toHaveURL(/inventory\.html/);

//   // Step 2: Add specific product
//   const product = page.locator('.inventory_item').filter({
//     hasText: 'Sauce Labs Backpack'
//   });

//   await product.getByRole('button', {
//     name: 'Add to cart'
//   }).click();

//   // Step 3: Open cart
//   await page.locator('.shopping_cart_link').click();

//   await expect(page.locator('.cart_item')).toHaveCount(1);
//   await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

//   // Step 4: Checkout
//   await page.locator('#checkout').click();

//   await page.getByPlaceholder('First Name').fill('Sample');
//   await page.getByPlaceholder('Last Name').fill('X');
//   await page.getByPlaceholder('Zip/Postal Code').fill('123456');

//   await page.locator('#continue').click();

//   // Step 5: Verify overview
//   await expect(page.getByText('Checkout: Overview')).toBeVisible();

//   await page.locator('#finish').click();

//   // Step 6: Verify confirmation
//   await expect(page.getByText('Thank you for your order!'))
//     .toHaveText('Thank you for your order!');

//   await expect(page.getByText('Checkout: Complete!'))
//     .toBeVisible();

//   // Step 7: Return to products
//   await page.getByText('Back Home').click();

//   // Step 8: Logout
//   await page.getByRole('button', { name: 'Open Menu' }).click();
//   await page.getByRole('button', { name: 'Logout' }).click();

//   await expect(page.getByPlaceholder('Username')).toBeVisible();
// });
