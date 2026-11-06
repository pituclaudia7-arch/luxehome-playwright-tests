# Bug report — Add to Cart loses the selected quantity

| Field | Details |
| --- | --- |
| Environment | [LuxeHome demo, product 1](https://daristr.github.io/luxehome-qa/#/product/1) · GitHub Actions on Ubuntu 24.04 · Playwright desktop Firefox and WebKit |
| Evidence | [Verified main-branch run and HTML report](https://github.com/pituclaudia7-arch/luxehome-playwright-tests/actions/runs/42270182967) · [Product-page regression spec](../tests/product-page.spec.ts) |

## Steps to reproduce

1. Open the Nordic Comfort Sofa product page in a fresh browser session with an empty cart.
2. Use the quantity increase button three times. Confirm the product page shows **4**.
3. Select **Add to Cart**, then open the cart.
4. Check the quantity for the Nordic Comfort Sofa.

**Expected** — The cart shows **4** units of the sofa.

**Observed** — The cart showed **1** in Firefox and WebKit in the linked run. The product page showed **4** immediately before adding the item.

**Customer impact** — The cart can contain fewer units than the shopper selected.

The run’s `playwright-report` artifact includes failure screenshots and retry traces while the artifact is retained. The observations come from the automated run. The steps above give a reviewer a way to reproduce the defect manually.
