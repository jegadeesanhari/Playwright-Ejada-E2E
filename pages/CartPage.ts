
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  private get checkoutButton() {
    return this.page.locator('#checkout');
  }

  private get cartItems() {
    return this.page.locator('.cart_item');
  }

  async verifyCartProduct(productName: string): Promise<void> {
    await expect(this.cartItems).toHaveCount(1);

    await this.verifyVisible(
      this.page.locator('.cart_item')
        .getByText(productName, { exact: true })
    );
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }
}
