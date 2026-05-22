import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartQuantityInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartQuantityInput = page.locator('input[type="number"]').last();
  }

  async expectQuantity(quantity: number) {
    await expect(this.cartQuantityInput).toHaveValue(String(quantity));
  }
}