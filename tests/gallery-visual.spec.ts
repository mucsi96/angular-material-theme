import { expect, test } from '@playwright/test';

[{ width: 1280, height: 900 }, { width: 390, height: 844 }].forEach(viewport => {
  test(`semantic actions visual review at ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto('/#/buttons');
    const region = page.getByRole('region', { name: 'Semantic button colors' });
    await expect(region).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const capture = async (name: string) => {
      const path = testInfo.outputPath(`${name}.png`);
      await region.screenshot({
        path,
        animations: 'disabled',
        style: 'bt-gallery-app-header { visibility: hidden; }',
      });
      await testInfo.attach(name, { path, contentType: 'image/png' });
    };

    await capture('resting');
    await page.getByRole('button', { name: 'FAB success', exact: true }).hover();
    await capture('success-hover');
    const error = page.getByRole('button', { name: 'Raised error', exact: true });
    await page.getByRole('button', { name: 'Filled error', exact: true }).focus();
    await page.keyboard.press('Tab');
    await expect(error).toBeFocused();
    await capture('error-focus');
    await error.evaluate(element => (element as HTMLElement).blur());
    const disabled = page.getByRole('button', { name: 'Disabled warn', exact: true });
    await expect(disabled).toBeDisabled();
    await disabled.hover({ force: true });
    await capture('disabled-hover');
  });
});
