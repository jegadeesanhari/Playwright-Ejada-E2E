
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

  constructor(protected readonly page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  async verifyVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async verifyText(
    locator: Locator,
    expectedText: string
  ): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyURL(url: RegExp | string): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }
}
