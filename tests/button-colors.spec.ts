import { expect, test, type Locator } from '@playwright/test';

const colors = (button: Locator) => button.evaluate(element => {
  const style = getComputedStyle(element);
  const ripple = element.querySelector('.mat-mdc-button-persistent-ripple');
  if (!ripple) throw new Error('Material button state layer is missing');
  const layer = getComputedStyle(ripple, '::before');
  const toRgb = (color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context is unavailable');
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
  };
  return {
    background: toRgb(style.backgroundColor),
    foreground: toRgb(style.color),
    hover: toRgb(layer.backgroundColor),
    opacity: Number(layer.opacity),
  };
});

['primary', 'success', 'warn', 'error'].forEach(tone => {
  test(`${tone} stays consistent across solid button variants on hover`, async ({ page }) => {
    await page.goto('/#/buttons');
    const results = await ['Filled', 'Raised', 'FAB', 'Mini FAB'].reduce(async (previous, variant) => {
      const collected = await previous;
      const button = page.getByRole('button', { name: `${variant} ${tone}`, exact: true });
      await button.hover();
      await expect.poll(async () => (await colors(button)).opacity).toBe(1);
      const result = await colors(button);
      expect(result.hover).not.toEqual(result.background);
      expect(result.hover.reduce((sum, channel) => sum + channel, 0))
        .toBeLessThan(result.background.reduce((sum, channel) => sum + channel, 0));
      const dominant = tone === 'primary' ? 2 : tone === 'success' ? 1 : 0;
      expect(result.hover[dominant]).toBe(Math.max(...result.hover));
      return [...collected, result];
    }, Promise.resolve([] as Awaited<ReturnType<typeof colors>>[]));
    results.forEach(result => expect(result).toEqual(results[0]));
  });
});

test('custom colors and keyboard focus work on every solid variant', async ({ page }) => {
  await page.goto('/#/buttons');
  await ['Filled', 'Raised', 'FAB', 'Mini FAB'].reduce(async (previous, variant) => {
    await previous;
    const button = page.getByRole('button', { name: `${variant} success`, exact: true });
    await button.evaluate(element => {
      element.removeAttribute('bt-color');
      element.style.setProperty('--bt-button-bg', '#28a745');
    });
    await button.focus();
    await expect(button).toBeFocused();
    expect((await colors(button)).background).toEqual([40, 167, 69]);
    await expect.poll(async () => (await colors(button)).opacity).toBeGreaterThan(0);
    await button.evaluate(element => (element as HTMLElement).blur());
    await button.hover();
    await expect.poll(async () => (await colors(button)).opacity).toBe(1);
    const { hover } = await colors(button);
    expect(hover[1]).toBe(Math.max(...hover));
  }, Promise.resolve());
});

test('disabled semantic buttons retain Material disabled appearance', async ({ page }) => {
  await page.goto('/#/buttons');
  const button = page.getByRole('button', { name: 'Disabled success', exact: true });
  const defaultButton = page.getByRole('button', { name: 'Disabled', exact: true }).first();
  await expect(button).toBeDisabled();
  expect(await colors(button)).toEqual(await colors(defaultButton));
  await button.hover({ force: true });
  const semanticHover = await colors(button);
  await defaultButton.hover({ force: true });
  expect(semanticHover).toEqual(await colors(defaultButton));
});
