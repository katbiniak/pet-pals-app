import { test, expect } from 'playwright/test';

test('should total price update on selecting animal type and hours', async ({ page }) => {

  await page.goto('http://localhost:3000/create');

  await page.getByLabel('Hours Requested').fill('6');

  await page.getByRole('combobox').click();

  await page.getByRole('option', { name: 'Dog' }).click();

  await expect(page.getByText('80')).toBeVisible({ timeout: 30000 });
});

