# LuxeHome product-page QA

Playwright and TypeScript tests for the LuxeHome demo store. The suite covers product details, quantity limits, and whether the selected quantity carries through to the cart. Product and cart page objects group reusable selectors and actions.

## Start here

- [Product-page spec](tests/product-page.spec.ts) — four functional checks covering product information, minimum quantity, stock limits, and cart quantity.
- [ProductPage](pages/ProductPage.ts) and [CartPage](pages/CartPage.ts) — typed page objects.
- [Keyboard check](tests/product-accessibility.spec.ts) — tabs to the quantity increase button, activates it with Enter, and checks that the quantity changes.
- [GitHub Actions runs](https://github.com/pituclaudia7-arch/luxehome-playwright-tests/actions/workflows/playwright.yml) — browser results and downloadable HTML reports.

## Example regression check

The Add to Cart test sets the quantity to 4, checks the product page value, adds the product, then checks for 4 in the cart. A mismatch fails the cart assertion and identifies the point where the selection was lost.

The keyboard check covers one control on one product page. Broader accessibility coverage would require additional checks.

## Run locally

Use Node.js LTS and npm. From the repository root:

```bash
npm ci
npx playwright install
npx playwright test --project=chromium
npx playwright show-report
```

Run `npx playwright test` to include Chromium, Firefox, and WebKit. The suite uses a hosted demo, so it needs network access.
