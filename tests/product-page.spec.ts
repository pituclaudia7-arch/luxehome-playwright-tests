import { test, expect } from '@playwright/test';

test.describe('LuxeHome Product Page', () => {

  test('Product information is displayed correctly', async ({ page }) => {

    await page.goto('https://daristr.github.io/luxehome-qa/#/product/1');

    await expect(
      page.getByRole('heading', { name: 'Nordic Comfort Sofa' })
    ).toBeVisible();

    await expect(
      page.getByText('$1299')
    ).toBeVisible();

    await expect(
      page.getByTestId('product-category')
    ).toHaveText('sofas');

    await expect(
      page.getByText('LH-00001')
    ).toBeVisible();

    await expect(
      page.getByTestId('stock-info')
    ).toHaveText('5 in stock');

  });

test('Quantity cannot go below 1', async ({ page }) => {

  await page.goto('https://daristr.github.io/luxehome-qa/#/product/1');

  const minusButton = page.getByTestId('btn-qty-decrease');
  const quantityInput = page.getByTestId('input-quantity');

  await expect(quantityInput).toHaveValue('1');

  await minusButton.click();

  await expect(quantityInput).toHaveValue('1');

});

test('Quantity cannot exceed available stock', async ({ page }) => {

  await page.goto('https://daristr.github.io/luxehome-qa/#/product/9');

  const plusButton = page.getByTestId('btn-qty-increase');
  const quantityInput = page.getByTestId('input-quantity');

  await expect(
    page.getByTestId('stock-info')
  ).toHaveText('7 in stock');

  for (let i = 0; i < 10; i++) {
    await plusButton.click();
  }

  await expect(quantityInput).toHaveValue('7');

});

test('Add to Cart keeps selected quantity', async ({ page }) => {

  await page.goto('https://daristr.github.io/luxehome-qa/#/product/1');

  const plusButton = page.getByTestId('btn-qty-increase');
  const quantityInput = page.getByTestId('input-quantity');

  for (let i = 0; i < 3; i++) {
    await plusButton.click();
  }

  await expect(quantityInput).toHaveValue('4');

  await page.getByTestId('btn-add-to-cart').click();

  await page.getByTestId('btn-nav-cart').click();

  const cartQuantityInput = page.locator('input[type="number"]').last();

  await expect(cartQuantityInput).toHaveValue('4');

});
});