import { test, expect } from '@playwright/test';

const navPages = [
  { path: '/', heading: /Marigold Arms/i },
  { path: '/menus', heading: /The Kitchen/i },
  { path: '/drinks', heading: /The Cellar/i },
  { path: '/gallery', heading: /./ },
  { path: '/visit', heading: /./ },
];

for (const { path, heading } of navPages) {
  test(`${path} loads without error`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e));
    const response = await page.goto(path);
    expect(response.ok()).toBeTruthy();
    await expect(page.locator('#root')).not.toBeEmpty();
    expect(errors).toEqual([]);
  });
}

test('header nav links point to real routes', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('.nav-desktop');
  for (const label of ['Home', 'Menus', 'Drinks', 'Gallery', 'Visit']) {
    await expect(nav.getByText(label, { exact: true })).toBeVisible();
  }
});

test('unknown route renders 404 with a way back home', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');
  await expect(page.getByRole('link', { name: /back to the pub/i })).toBeVisible();
});

test('footer links navigate to existing pages', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Menus', exact: true }).click();
  await expect(page).toHaveURL(/\/menus$/);
});
