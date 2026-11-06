
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  private get username() {
    return this.page.getByPlaceholder('Username');
  }

  private get password() {
    return this.page.getByPlaceholder('Password');
  }

  private get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  private get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async openApplication(): Promise<void> {
    await this.navigate('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.loginButton);
  }

  async verifyLoginError(message: string): Promise<void> {
    await this.verifyText(this.errorMessage, message);
  }

  async verifyLoginPage(): Promise<void> {
    await this.verifyVisible(this.loginButton);
  }

  async getLoginErrorText(): Promise<string> {
  return await this.getText(this.errorMessage);
}
}
