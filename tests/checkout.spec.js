import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout flow', () => {
  test('should complete checkout successfully', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);

    // Add product
    const productsPage = new ProductsPage(page);
    await expect(productsPage.inventoryList).toBeVisible();
    await productsPage.addBackpackToCart();
    await productsPage.assertBackpackAdded();

    // Go to cart
    await productsPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);

    // Checkout
    const cartPage = new CartPage(page);
    await expect(cartPage.cartItem).toBeVisible();
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // Fill info and finish
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo({
      firstName: 'Test',
      lastName: 'User',
      postalCode: '34000',
    });

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toContainText('Thank you');
  });
});
