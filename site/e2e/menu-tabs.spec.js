import { test, expect } from '@playwright/test';

const tabs = [
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'sunday', label: 'Sunday roast' },
  { id: 'pudding', label: 'Puddings' },
  { id: 'bar', label: 'Bar snacks' },
];

test('every menu tab exists and shows content when selected', async ({ page }) => {
  await page.goto('/menus');
  const tablist = page.getByRole('tablist', { name: 'Menu service' });

  for (const { label } of tabs) {
    const tabButton = tablist.getByRole('tab', { name: label });
    await expect(tabButton).toBeVisible();
    await tabButton.click();
    await expect(tabButton).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('main')).not.toContainText('undefined');
  }
});

test('menu tab state is reflected in the URL and survives reload', async ({ page }) => {
  await page.goto('/menus');
  await page.getByRole('tab', { name: 'Sunday roast' }).click();
  await expect(page).toHaveURL(/service=sunday/);
  await page.reload();
  await expect(page.getByRole('tab', { name: 'Sunday roast' })).toHaveAttribute('aria-selected', 'true');
});
