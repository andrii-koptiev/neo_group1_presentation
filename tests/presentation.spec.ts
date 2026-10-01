import { test, expect } from '@playwright/test';

test('complete presentation using the keyboard and restart', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'TEAM_OS', exact: true })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  for (const member of ['Андрій', 'Олексій', 'Марія']) {
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('heading', { name: member, exact: true })).toBeVisible();
    for (const title of [
      'Про мене',
      'Досвід',
      'Чому Neoversity?',
      'Моя ціль',
      'Суперсила',
      'Чим можу допомогти',
      'Після магістратури',
    ]) {
      await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
    }
  }
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('heading', { name: 'Різні історії. Спільний напрям.' }),
  ).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.getByRole('heading', { name: 'Далі — більше.' })).toBeVisible();
  const coffee = page.getByRole('button', { name: 'Запустити кавову перерву' });
  await coffee.focus();
  await page.keyboard.press('Space');
  await expect(coffee).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toContainText('Каву заварено');
  await page.keyboard.press('Space');
  await expect(coffee).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Почати спочатку' }).click();
  await expect(page.getByRole('heading', { name: 'TEAM_OS', exact: true })).toBeVisible();
});

test('member selection, Escape, Home, End, previous, and focused Space', async ({ page }) => {
  await page.goto('/');
  const enter = page.getByRole('button', { name: 'Познайомитися' });
  await enter.focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  await page.getByRole('button', { name: /Познайомитися з Марія/ }).click();
  await expect(page.getByRole('heading', { name: 'Марія', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Про мене', exact: true })).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('heading', { name: 'Олексій', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  await page.keyboard.press('End');
  await expect(page.getByRole('heading', { name: 'Далі — більше.' })).toBeVisible();
  await page.keyboard.press('Home');
  await expect(page.getByRole('heading', { name: 'TEAM_OS', exact: true })).toBeVisible();
});

for (const viewport of [
  { width: 3440, height: 1440 },
  { width: 3840, height: 2160 },
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
]) {
  test(`screens fit viewport at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    for (let i = 0; i < 7; i++) {
      await expect(page.getByLabel(`Слайд ${i + 1} / 7`, { exact: true })).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('.slide > section')).toBeVisible();
      await expect
        .poll(async () =>
          page.evaluate(() => {
            const main = document.querySelector('main')!.getBoundingClientRect();
            const screen = document.querySelector('.slide > section')!.getBoundingClientRect();
            return screen.top >= main.top - 1 && screen.bottom <= main.bottom + 1;
          }),
        )
        .toBe(true);
      const cards = page.locator('.profile-answer');
      if (await cards.count()) {
        await expect(cards).toHaveCount(7);
        for (const card of await cards.all()) {
          await expect(card).toBeVisible();
          const rect = await card.boundingBox();
          const main = await page.locator('main').boundingBox();
          expect(rect!.y + rect!.height).toBeLessThanOrEqual(main!.y + main!.height + 1);
          const copy = await card.locator('.answer-copy').boundingBox();
          expect(copy!.y).toBeGreaterThanOrEqual(rect!.y);
          expect(copy!.y + copy!.height).toBeLessThanOrEqual(rect!.y + rect!.height + 1);
        }
      }
      const bounds = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        innerWidth,
        innerHeight,
      }));
      expect(bounds.width).toBeLessThanOrEqual(bounds.innerWidth);
      expect(bounds.height).toBeLessThanOrEqual(bounds.innerHeight);
      await page.keyboard.press('ArrowRight');
    }
  });
}

test('overview scales to ten members without component changes', async ({ page }) => {
  await page.route('**/src/data/team.ts', async (route) => {
    const response = await route.fetch();
    const original = await response.text();
    await route.fulfill({
      response,
      body:
        original +
        '\nteam.push(...Array.from({length: 7}, (_, i) => ({...team[i % 3], id: "extra-" + i, name: team[i % 3].name + " " + (i + 2)})));',
    });
  });
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1280, height: 720 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'TEAM_OS', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
    await expect(page.locator('.member-card')).toHaveCount(10);
    const bounds = await page.evaluate(() => {
      const main = document.querySelector('main')!.getBoundingClientRect();
      const grid = document.querySelector('.member-grid')!.getBoundingClientRect();
      return {
        fits: grid.top >= main.top && grid.bottom <= main.bottom,
        width: document.documentElement.scrollWidth,
        innerWidth,
      };
    });
    expect(bounds.fits).toBe(true);
    expect(bounds.width).toBeLessThanOrEqual(bounds.innerWidth);
  }
});

test('capture screens and report runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await page.screenshot({ path: 'test-results/intro-desktop.png' });
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  await page.screenshot({ path: 'test-results/team-desktop.png' });
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { name: 'Андрій', exact: true })).toBeVisible();
  await page.screenshot({ path: 'test-results/profile-desktop.png' });
  await expect(page.getByRole('heading', { name: 'Про мене', exact: true })).toBeVisible();
  await page.screenshot({ path: 'test-results/answer-desktop.png' });
  await page.keyboard.press('End');
  await page.keyboard.press('ArrowLeft');
  await expect(
    page.getByRole('heading', { name: 'Різні історії. Спільний напрям.' }),
  ).toBeVisible();
  await page.screenshot({ path: 'test-results/summary-desktop.png' });
  await page.keyboard.press('End');
  await expect(page.getByRole('heading', { name: 'Далі — більше.' })).toBeVisible();
  await page.screenshot({ path: 'test-results/final-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.keyboard.press('Home');
  await expect(page.locator('.intro-title')).toBeVisible();
  await page.screenshot({ path: 'test-results/intro-mobile.png' });
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  await page.screenshot({ path: 'test-results/team-mobile.png' });
  await page.getByRole('button', { name: /Познайомитися з Андрій/ }).click();
  await expect(page.getByRole('heading', { name: 'Андрій', exact: true })).toBeVisible();
  await page.screenshot({ path: 'test-results/profile-mobile.png' });
  expect(errors).toEqual([]);
});

test('normal motion, boot readiness, focus, and button navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.intro-title')).toBeFocused({ timeout: 5500 });
  await expect(page.getByRole('progressbar')).toHaveCount(0);
  await expect(page.getByText('Ініціалізація команди', { exact: false })).toHaveCount(0);
  await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeFocused();
  await page.getByRole('button', { name: /Познайомитися з Андрій/ }).click();
  await expect(page.getByRole('heading', { name: 'Андрій', exact: true })).toBeFocused();
  await expect(page.getByRole('heading', { name: 'Чому Neoversity?', exact: true })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { name: 'Олексій', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('heading', { name: 'Далі — більше.' })).toBeFocused();
  await page.locator('.nav-arrow').click();
  await expect(
    page.getByRole('heading', { name: 'Різні історії. Спільний напрям.' }),
  ).toBeFocused();
  await page.locator('.nav-next').click();
  await expect(page.getByRole('heading', { name: 'Далі — більше.' })).toBeFocused();
});

test('portrait crops and an immediately skippable initial loader', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.getByRole('progressbar', { name: 'Ініціалізація команди' })).toBeVisible();
  await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  await page.getByRole('button', { name: /Познайомитися з Андрій/ }).click();
  await expect(page.getByRole('heading', { name: 'Андрій', exact: true })).toBeFocused();
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1280, height: 720 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    const portrait = await page.locator('.profile-identity .avatar').boundingBox();
    expect(portrait!.width / portrait!.height).toBeCloseTo(0.75, 2);
  }
});

test('intro has one entry action and the footer has one navigation group', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.intro-title')).toBeVisible();
  await expect(page.locator('.boot-panel')).toHaveCount(0);
  await expect(page.locator('.chapter-nav')).toHaveCount(0);
  await expect(page.locator('.shell-footer button')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Познайомитися', exact: true })).toHaveCount(1);
  await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  await expect(page.locator('.shell-footer button')).toHaveCount(2);
  await page.locator('.nav-next').focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('heading', { name: 'Андрій', exact: true })).toBeVisible();
});

test('member card follows the reference hierarchy with all seven topics visible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
  await page.getByRole('button', { name: /Познайомитися з Андрій/ }).click();
  await expect(page.getByRole('heading', { name: 'Андрій', exact: true })).toBeVisible();
  await expect(page.locator('.member-hero')).toBeVisible();
  await expect(page.locator('.member-journey')).toBeVisible();
  await expect(page.locator('.profile-answer')).toHaveCount(7);
  await expect(page.locator('.member-story')).toBeVisible();
  await expect(page.locator('.member-details .profile-answer')).toHaveCount(4);
  await expect(page.locator('.member-future')).toBeVisible();
  await expect(page.locator('.member-tags span')).toHaveText([
    'React',
    'TypeScript',
    'GraphQL',
    'Next.js',
    'Azure',
    'Claude API',
  ]);
  const photo = page.locator('.profile-identity img');
  await expect(photo).toBeVisible();
  await expect
    .poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);
  const name = await page.locator('.member-hero h1').boundingBox();
  const portrait = await page.locator('.profile-identity .avatar').boundingBox();
  const story = await page.locator('.member-story').boundingBox();
  const future = await page.locator('.member-future').boundingBox();
  expect(portrait!.x).toBeGreaterThan(name!.x + name!.width);
  expect(story!.y).toBeGreaterThan(name!.y + name!.height);
  expect(future!.y).toBeGreaterThan(story!.y + story!.height);
  await page.setViewportSize({ width: 3440, height: 1440 });
  const stage = await page.locator('main').boundingBox();
  expect(stage!.width).toBeLessThanOrEqual(1560);
  const header = await page.locator('.shell-header').boundingBox();
  const footer = await page.locator('.shell-footer').boundingBox();
  const profile = await page.locator('.member-card-page').boundingBox();
  expect(stage!.y).toBeCloseTo(header!.y + header!.height, 0);
  expect(stage!.y + stage!.height).toBeCloseTo(footer!.y, 0);
  expect(profile!.height).toBeCloseTo(stage!.height, 0);
  expect(stage!.x).toBeCloseTo((3440 - stage!.width) / 2, 0);
  await page.screenshot({ path: 'test-results/profile-ultrawide.png' });
});
