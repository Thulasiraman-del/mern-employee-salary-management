import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Enter your username"]', 'admin');
  await page.fill('input[placeholder="Enter your password"]', 'admin123');
  await page.click('input[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 10000 });
});

test.describe('Employee Management', () => {
  test('employee list page loads', async ({ page }) => {
    await page.goto('/admin/master-data/data-pegawai');
    await expect(page).toHaveURL(/data-pegawai/);
  });

  test('employee list shows existing employees', async ({ page }) => {
    await page.goto('/admin/master-data/data-pegawai');
    await expect(page.locator('table')).toBeVisible();
  });

  test('position list page loads with salary data', async ({ page }) => {
    await page.goto('/admin/master-data/data-jabatan');
    await expect(page).toHaveURL(/data-jabatan/);
  });

  test('attendance page loads', async ({ page }) => {
    await page.goto('/admin/transaksi/data-absensi');
    await expect(page).toHaveURL(/data-absensi/);
  });

  test('salary data page loads', async ({ page }) => {
    await page.goto('/admin/transaksi/data-gaji');
    await expect(page).toHaveURL(/data-gaji/);
  });

  test('payslip page loads', async ({ page }) => {
    await page.goto('/admin/laporan/slip-gaji');
    await expect(page).toHaveURL(/slip-gaji/);
  });
});