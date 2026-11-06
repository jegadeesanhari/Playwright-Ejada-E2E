
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInformationPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  private get firstName() {
    return this.page.getByPlaceholder('First Name');
  }

  private get lastName() {
    return this.page.getByPlaceholder('Last Name');
  }

  private get postalCode() {
    return this.page.getByPlaceholder('Zip/Postal Code');
  }

  private get continueButton() {
    return this.page.locator('#continue');
  }

  async enterCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {

    await this.fill(this.firstName, firstName);
    await this.fill(this.lastName, lastName);
    await this.fill(this.postalCode, postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.click(this.continueButton);
  }
  
async enterFirstName(firstName: string): Promise<void> {
  await this.fill(this.firstName, firstName);
}

async enterLastName(lastName: string): Promise<void> {
  await this.fill(this.lastName, lastName);
}

async enterPostalCode(postalCode: string): Promise<void> {
  await this.fill(this.postalCode, postalCode);
}

async verifyCheckoutError(message: string): Promise<void> {
  await this.verifyText(
    this.page.getByRole('alert'),
    message
  );
}

async getFirstNameValue(): Promise<string> {
  return await this.firstName.inputValue();
}

async getLastNameValue(): Promise<string> {
  return await this.lastName.inputValue();
}

}
