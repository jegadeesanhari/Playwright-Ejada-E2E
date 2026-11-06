
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  private get finishButton() {
    return this.page.locator('#finish');
  }

  private get overviewTitle() {
    return this.page.getByText('Checkout: Overview');
  }

  async verifyOverviewPage(): Promise<void> {
    await this.verifyVisible(this.overviewTitle);
  }

  async finishOrder(): Promise<void> {
    await this.click(this.finishButton);
  }
  
  
  async verifyOrderNotCompleted(): Promise<void> {
    await this.verifyURL(/checkout-step-two\.html/);

    await expect(
      this.page.getByText('Thank you for your order!')
    ).not.toBeVisible();
}

}
