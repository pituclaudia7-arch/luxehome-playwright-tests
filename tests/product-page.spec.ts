import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('LuxeHome Product Page', () => {
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
  });

  test('Product information is displayed correctly', async () => {
    await productPage.gotoProduct(1);

    await expect(productPage.page.getByRole('heading', { name: 'Nordic Comfort Sofa' })).toBeVisible();
    await expect(productPage.page.getByText('$1299')).toBeVisible();
    await expect(productPage.productCategory).toHaveText('sofas');
    await expect(productPage.page.getByText('LH-00001')).toBeVisible();
    await expect(productPage.stockInfo).toHaveText('5 in stock');
  });

  test('Quantity cannot go below 1', async () => {
    await productPage.gotoProduct(1);

    await expect(productPage.quantityInput).toHaveValue('1');

    await productPage.decreaseQuantityButton.click();

    await expect(productPage.quantityInput).toHaveValue('1');
  });

  test('Quantity cannot exceed available stock', async () => {
    const stock = 7;
    const clicksAboveStock = stock + 3;

    await productPage.gotoProduct(9);

    await expect(productPage.stockInfo).toHaveText(`${stock} in stock`);

    await productPage.increaseQuantity(clicksAboveStock);

    await expect(productPage.quantityInput).toHaveValue(String(stock));
  });

  test('Add to Cart keeps selected quantity', async () => {
    const selectedQuantity = 4;
    const clicksToReachSelectedQuantity = selectedQuantity - 1;

    await productPage.gotoProduct(1);

    await productPage.increaseQuantity(clicksToReachSelectedQuantity);

    await expect(productPage.quantityInput).toHaveValue(String(selectedQuantity));

    await productPage.addToCart();
    await productPage.openCart();

    await cartPage.expectQuantity(selectedQuantity);
  });
});