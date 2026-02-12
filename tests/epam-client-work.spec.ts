// EPAM Client Work navigation test
import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

// This test launches a browser, navigates to EPAM site, interacts with the header menu,
// clicks the "Explore Our Client Work" link and verifies that "Client Work" text is visible.
// The browser is explicitly closed in a finally block to satisfy the requirement to always close the browser.

test('Navigate to EPAM and verify Client Work', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Navigate to EPAM
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // 2. Select (hover) the "Services" item from the header menu
    const servicesLocator = page.locator('header').locator('text=Services').first();
    await servicesLocator.waitFor({ state: 'visible', timeout: 10000 });
    await servicesLocator.hover();

    // 3. Click the "Explore Our Client Work" link
    const exploreLink = page.getByRole('link', { name: /Explore Our Client Work/i });
    await expect(exploreLink).toBeVisible({ timeout: 10000 });
    await exploreLink.click();

    // 4. Verify that the "Client Work" text is visible on the page
    await page.waitForLoadState('networkidle');
    const clientWorkHeading = page.locator('text=Client Work');
    await expect(clientWorkHeading).toBeVisible({ timeout: 10000 });
  } finally {
    // Always close the browser once the scenario is executed
    await browser.close();
  }
});
