
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  private get cartIcon() {
    return this.page.locator('.shopping_cart_link');
  }

  private get menuButton() {
    return this.page.getByRole('button', {
      name: 'Open Menu'
    });
  }

  private get logoutButton() {
    return this.page.getByRole('button', {
      name: 'Logout'
    });
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item')
      .filter({ hasText: productName });

    await this.click(
      product.getByRole('button', { name: 'Add to cart' })
    );
  }

  async openCart(): Promise<void> {
    await this.click(this.cartIcon);
  }

  async verifyInventoryPage(): Promise<void> {
    await this.verifyURL(/inventory\.html/);
  }

  async logout(): Promise<void> {
    await this.click(this.menuButton);
    await this.click(this.logoutButton);
  }

  
async verifyProductsDisplayed(): Promise<void> {
  await this.verifyVisible(
    this.page.locator('.inventory_item').first()
  );
}

  
async getProductPrice(productName: string): Promise<string> {
  const product = this.page.locator('.inventory_item')
    .filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: productName
      })
    });

  return await this.getText(
    product.locator('.inventory_item_price')
  );
}

}
