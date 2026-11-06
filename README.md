# LuxeHome product-page QA

Playwright and TypeScript tests for the LuxeHome demo store. The suite covers product details, quantity limits, and whether the selected quantity carries through to the cart. Product and cart page objects group reusable selectors and actions.

## Start here

- [Product-page spec](tests/product-page.spec.ts) — four functional checks covering product information, minimum quantity, stock limits, and cart quantity.
- [ProductPage](pages/ProductPage.ts) and [CartPage](pages/CartPage.ts) — typed page objects.
- [Keyboard check](tests/product-accessibility.spec.ts) — tabs to the quantity increase button, activates it with Enter, and checks that the quantity changes.
- [GitHub Actions runs](https://github.com/pituclaudia7-arch/luxehome-playwright-tests/actions/workflows/playwright.yml) — browser results and downloadable HTML reports.

## Verified demo results

The [6 November 2026 browser run](https://github.com/pituclaudia7-arch/luxehome-playwright-tests/actions/runs/42267406039) completed with **10 passed and 5 failed**. The keyboard check passed in Chromium, Firefox, and WebKit. The run includes an HTML report with failure screenshots and retry traces.

| Regression check | Expected | Observed |
| --- | --- | --- |
| Stock limit on product 9 | The quantity stops at the 7 units shown in stock. | It reached 11 in Chromium, Firefox, and WebKit. |
| Add to Cart on product 1 | The cart keeps the selected quantity of 4. | The cart showed 1 in Firefox and WebKit. |

The [product-page spec](tests/product-page.spec.ts) keeps the expected behavior in its assertions so the demo failures remain visible. The keyboard check covers one control on one product page.

## Run locally

Use Node.js LTS and npm. From the repository root:

```bash
npm ci
npx playwright install
npx playwright test --project=chromium
npx playwright show-report
```

Run `npx playwright test` to include Chromium, Firefox, and WebKit. The suite uses a hosted demo, so it needs network access.
