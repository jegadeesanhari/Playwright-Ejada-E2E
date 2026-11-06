
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  private get confirmationMessage() {
    return this.page.getByText('Thank you for your order!');
  }

  private get completeTitle() {
    return this.page.getByText('Checkout: Complete!');
  }

  private get backHomeButton() {
    return this.page.getByText('Back Home');
  }

  async verifyOrderCompletion(): Promise<void> {
    await this.verifyText(
      this.confirmationMessage,
      'Thank you for your order!'
    );

    await this.verifyVisible(this.completeTitle);
  }

  async backToProducts(): Promise<void> {
    await this.click(this.backHomeButton);
  }
}
