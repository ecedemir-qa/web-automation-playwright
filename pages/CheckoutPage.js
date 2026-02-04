export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');

    this.finishBtn = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');

    this.errorBanner = page.locator('[data-test="error"]');
  }

  async fillShippingInfo({ firstName, lastName, postalCode }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueBtn.click();
  }

  async continueWithEmptyForm() {
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }
}
