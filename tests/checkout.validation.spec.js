import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout validations', () => {
  test('should show error when checkout info is empty', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);

    // Add product and go to cart
    const productsPage = new ProductsPage(page);
    await productsPage.addBackpackToCart();
    await productsPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);

    // Go to checkout step one
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // Continue without filling form
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.continueWithEmptyForm();

    // Assert error banner appears
    await expect(checkoutPage.errorBanner).toBeVisible();
  });
});
