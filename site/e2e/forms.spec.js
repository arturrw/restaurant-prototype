import { test, expect } from '@playwright/test';

test('reservation form submits normally when filled like a person', async ({ page }) => {
  await page.goto('/visit');
  await page.getByPlaceholder('e.g. James Whitfield').fill('Alex Rivers');
  await page.getByPlaceholder('e.g. 07700 900123').fill('07700 900123');
  await page.locator('.cal-day:not(:disabled)').first().click();
  await page.locator('.cal-slot-trigger').click();
  await page.locator('.cal-slot-option').first().click();
  // The guard's time-trap only trips on near-instant submits; a real visitor
  // easily clears it while filling in the fields above.
  await page.waitForTimeout(900);
  await page.getByRole('button', { name: 'Request the table' }).click();
  await expect(page.getByText('Thank you, Alex')).toBeVisible();
  // The confirmation's What/When/Who/Where card and add-to-calendar links.
  await expect(page.locator('.confirm-card')).toContainText('Alex Rivers');
  await expect(page.locator('.confirm-card')).toContainText('14 Elder Street');
  await expect(page.getByRole('link', { name: 'Google Calendar' })).toHaveAttribute('href', /calendar\.google\.com/);
  await expect(page.getByRole('link', { name: /ics/i })).toHaveAttribute('href', /^data:text\/calendar/);
});

test('a filled honeypot is quietly accepted, not surfaced as an error', async ({ page }) => {
  await page.goto('/visit');
  // A script that fills every input it finds would hit this one too — it's
  // invisible and unreachable by tab order for a real visitor.
  await page.locator('#company').fill('Acme Inc');
  await page.getByPlaceholder('e.g. James Whitfield').fill('Bot Tester');
  await page.getByPlaceholder('e.g. 07700 900123').fill('07700 900123');
  await page.locator('.cal-day:not(:disabled)').first().click();
  await page.locator('.cal-slot-trigger').click();
  await page.locator('.cal-slot-option').first().click();
  await page.getByRole('button', { name: 'Request the table' }).click();
  await expect(page.getByText('Thank you, Bot')).toBeVisible();
});

test('booking calendar picks a date with a scrollable dropdown of sittings', async ({ page }) => {
  await page.goto('/visit');
  // Every day rendered this month is either disabled (past) or clickable —
  // grab the first enabled one so the test doesn't hardcode a date.
  const day = page.locator('.cal-day:not(:disabled)').first();
  const label = await day.getAttribute('aria-label');
  await day.click();
  await expect(page.locator('.cal-slots-date')).toHaveText(label);

  const trigger = page.locator('.cal-slot-trigger');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  const options = page.locator('.cal-slot-option');
  // Far more than the old fixed three sittings — a real dropdown's worth.
  expect(await options.count()).toBeGreaterThan(6);

  // Read the option's text before clicking it — the click closes the list
  // and removes it from the DOM, so reading it after would hang waiting
  // for an element that's gone.
  const chosen = (await options.nth(2).textContent()).trim();
  await options.nth(2).click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toContainText(chosen);
});

test('sitting dropdown closes on outside click', async ({ page }) => {
  await page.goto('/visit');
  await page.locator('.cal-day:not(:disabled)').first().click();
  const trigger = page.locator('.cal-slot-trigger');
  await trigger.click();
  await expect(page.locator('.cal-slot-list')).toBeVisible();
  await page.locator('h2', { hasText: 'Reserve the dining room' }).click();
  await expect(page.locator('.cal-slot-list')).toBeHidden();
});

test('newsletter honeypot field is present but off-screen and untabbable', async ({ page }) => {
  await page.goto('/');
  const honeypot = page.locator('#website');
  await expect(honeypot).toBeAttached();
  // Deliberately not display:none (some bots skip hidden fields) — instead
  // pushed off-screen and out of tab order, so a real visitor never lands
  // on it however they navigate the form.
  const box = await honeypot.boundingBox();
  expect(box.x).toBeLessThan(0);
  await expect(honeypot).toHaveAttribute('tabindex', '-1');
});

test('name field strips digits and symbols, keeps letters and spaces', async ({ page }) => {
  await page.goto('/visit');
  const name = page.getByPlaceholder('e.g. James Whitfield');
  await name.pressSequentially('J0hn123 D0e!!');
  await expect(name).toHaveValue('Jhn De');
});

test('telephone field strips everything but digits', async ({ page }) => {
  await page.goto('/visit');
  const phone = page.getByPlaceholder('e.g. 07700 900123');
  await phone.pressSequentially('abc 07700-900123 xyz');
  await expect(phone).toHaveValue('07700900123');
});

test('guests field only accepts digits and is capped at 12', async ({ page }) => {
  await page.goto('/visit');
  const guests = page.locator('.form-grid input').nth(2);
  await guests.fill('');
  await guests.pressSequentially('99abc');
  await expect(guests).toHaveValue('12');
});

test('footer private hire and careers links land on their sections', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Private hire' }).click();
  await expect(page).toHaveURL(/\/visit#private-hire$/);
  await expect(page.locator('#private-hire')).toBeVisible();
  await expect(page.locator('#private-hire')).toContainText('events@marigoldarms.co.uk');

  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Work with us' }).click();
  await expect(page).toHaveURL(/\/visit#careers$/);
  await expect(page.locator('#careers')).toBeVisible();
  await expect(page.locator('#careers')).toContainText('jobs@marigoldarms.co.uk');
});
