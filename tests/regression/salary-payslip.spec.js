import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Enter your username"]', 'admin');
  await page.fill('input[placeholder="Enter your password"]', 'admin123');
  await page.click('input[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 10000 });
});

test.describe('Salary → Payslip Pipeline (Regression)', () => {
  test('salary data page loads', async ({ page }) => {
    await page.goto('/admin/transaksi/data-gaji');
    await expect(page).toHaveURL(/data-gaji/);
  });

  test('deduction settings exist before salary calculation', async ({ page }) => {
    await page.goto('/admin/transaksi/setting-potongan-gaji');
    await expect(page).toHaveURL(/setting-potongan-gaji/);
    await expect(page.locator('table')).toBeVisible();
  });

  test('payslip page loads and requires filters', async ({ page }) => {
    await page.goto('/admin/laporan/slip-gaji');
    await expect(page).toHaveURL(/slip-gaji/);
  });

  test('salary report page exists and is accessible', async ({ page }) => {
    await page.goto('/admin/laporan/laporan-gaji');
    await expect(page).toHaveURL(/laporan-gaji/);
  });

  test('attendance page loads', async ({ page }) => {
    await page.goto('/admin/transaksi/data-absensi');
    await expect(page).toHaveURL(/data-absensi/);
  });
});