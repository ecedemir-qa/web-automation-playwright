export class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.inventoryList = page.locator('.inventory_list');
    this.cartLink = page.locator('.shopping_cart_link');

    // Sauce Demo stable selector for backpack
    this.addBackpackBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.removeBackpackBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
  }

  async addBackpackToCart() {
    await this.addBackpackBtn.click();
  }

  async assertBackpackAdded() {
    // After adding, button turns into "Remove"
    await this.removeBackpackBtn.waitFor({ state: 'visible' });
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
