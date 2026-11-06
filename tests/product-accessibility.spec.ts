import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test('Quantity can be increased with the keyboard', async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.gotoProduct(1);
  await expect(productPage.quantityInput).toHaveValue('1');

  const increaseButton = productPage.increaseQuantityButton;
  await expect(increaseButton).toBeEnabled();

  for (let step = 0; step < 40; step++) {
    await page.keyboard.press('Tab');
    if (await increaseButton.evaluate(button => button === document.activeElement)) {
      break;
    }
  }

  await expect(increaseButton).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(productPage.quantityInput).toHaveValue('2');
});
