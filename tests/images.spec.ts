import { test, expect } from '@playwright/test';
import { stat } from 'node:fs/promises';
import { team } from '../src/data/team';

const portraits = team.flatMap((member) => (member.image ? [member.image] : []));

test('presentation portraits stay within the download budget', async () => {
  const files = await Promise.all(portraits.map((path) => stat(`public/${path}`)));
  for (const file of files) expect(file.size).toBeLessThan(350 * 1024);
  expect(files.reduce((total, file) => total + file.size, 0)).toBeLessThan(2 * 1024 * 1024);
});

test('portraits load during the intro and are reused across presentation screens', async ({
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'image') requests.push(new URL(request.url()).pathname);
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'TEAM_OS', exact: true })).toBeVisible();
  await expect.poll(() => requests.length).toBe(portraits.length);
  for (const portrait of portraits) expect(requests).toContain(`/${portrait}`);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
  await expect(page.locator('.member-card img')).toHaveCount(portraits.length);
  await expect
    .poll(() =>
      page
        .locator('.member-card img')
        .evaluateAll((images) =>
          images.every(
            (image) =>
              image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { name: team[0].name, exact: true })).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator('.profile-identity img')
        .evaluate(
          (image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  expect(requests).toHaveLength(portraits.length);
});
