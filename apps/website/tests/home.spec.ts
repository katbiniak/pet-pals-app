import { test, expect } from 'playwright/test';

test('should navigate to the create new booking page', async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await page.click('text=New');

  await expect(page).toHaveURL('http://localhost:3000/create');

  await expect(page.locator('h1')).toContainText('Create New Booking');
});

test('should navigate to the admin bookings page', async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await page.click('text=Admin');

  await expect(page).toHaveURL('http://localhost:3000/bookings');

  await expect(page.locator('h1')).toContainText('Bookings');
});
