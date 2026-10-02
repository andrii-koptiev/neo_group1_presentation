import { test, expect } from '@playwright/test';

test('intro technologies are unique, fit the screen, and include a new member automatically', async ({
  page,
}) => {
  await page.route('**/src/data/team.ts', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body:
        (await response.text()) +
        '\nteam.push({...team[0], id: "new-member", technologies: ["Rust", "react", " Java "]});',
    });
  });
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const list = page.getByRole('list', { name: 'СТЕК НАШОЇ КОМАНДИ' });
    await expect(list).toBeVisible();
    const badges = list.getByRole('listitem');
    const names = (await badges.allTextContents()).map((name) => name.trim().toLowerCase());
    expect(names).toHaveLength(8);
    expect(new Set(names).size).toBe(names.length);
    expect(names).toContain('rust');
    expect(names).not.toContain('outsystems');
    expect(names).not.toContain('microservices');
    expect(names.filter((name) => name === 'react')).toHaveLength(1);
    const main = await page.locator('main').boundingBox();
    for (const badge of await badges.all()) {
      const box = await badge.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(main!.x);
      expect(box!.x + box!.width).toBeLessThanOrEqual(main!.x + main!.width);
      expect(box!.y + box!.height).toBeLessThanOrEqual(main!.y + main!.height);
    }
  }
});

test('intro parallax respects reduced motion', async ({ page }) => {
  await page.goto('/');
  const list = page.getByRole('list', { name: 'СТЕК НАШОЇ КОМАНДИ' });
  await expect(list).toBeVisible();
  const before = await list.evaluate((element) => getComputedStyle(element).transform);
  await list.getByRole('listitem').first().hover();
  await page.waitForTimeout(300);
  expect(await list.evaluate((element) => getComputedStyle(element).transform)).toBe(before);
  expect(
    await page
      .locator('.ambient--purple')
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.mouse.move(0, 0);
  await list.getByRole('listitem').first().hover();
  await expect
    .poll(() => list.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(before);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() => list.evaluate((element) => getComputedStyle(element).transform))
    .toBe(before);
});

test('dimensional loader fits the screen and can be skipped during progress', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1280, height: 720 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const progress = page.getByRole('progressbar', { name: 'Ініціалізація команди' });
    await expect(progress).toHaveAttribute('aria-valuenow', '1');
    const track = await progress.boundingBox();
    const fill = await progress.locator('div').boundingBox();
    expect(fill!.width / track!.width).toBeGreaterThan(0.15);
    expect(fill!.width / track!.width).toBeLessThan(0.6);
    await page.screenshot({ path: `test-results/loader-${viewport.width}.png` });
    const main = await page.locator('main').boundingBox();
    const loader = await page.locator('.initial-loader').boundingBox();
    expect(loader!.y).toBeGreaterThanOrEqual(main!.y);
    expect(loader!.y + loader!.height).toBeLessThanOrEqual(main!.y + main!.height);
    expect(loader!.x + loader!.width).toBeLessThanOrEqual(main!.x + main!.width);
    await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  }
});

test('complete presentation using the keyboard and restart', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'TEAM_OS', exact: true })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  for (const member of [
    'Андрій',
    'Валентина',
    'Сергій',
    'Галина',
    'Валентина Дрозд',
    'Олена Гокун',
  ]) {
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('heading', { name: member, exact: true })).toBeVisible();
    const portrait = page.locator('.profile-identity img');
    await expect(portrait).toBeVisible();
    await expect
      .poll(() => portrait.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
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
  await page.getByRole('button', { name: /Познайомитися з Галина/ }).click();
  await expect(page.getByRole('heading', { name: 'Галина', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Про мене', exact: true })).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('heading', { name: 'Сергій', exact: true })).toBeVisible();
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
    for (let i = 0; i < 10; i++) {
      await expect(page.getByLabel(`Слайд ${i + 1} / 10`, { exact: true })).toBeVisible();
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
        const hero = await page.locator('.member-hero').boundingBox();
        const lastTag = await page.locator('.member-tags span').last().boundingBox();
        expect(lastTag!.y + lastTag!.height).toBeLessThanOrEqual(hero!.y + hero!.height + 1);
        await expect(cards).toHaveCount(7);
        for (const card of await cards.all()) {
          await expect(card).toBeVisible();
          const rect = await card.boundingBox();
          const parent = await card.evaluate((element) =>
            element.parentElement!.getBoundingClientRect().toJSON(),
          );
          expect(rect!.y + rect!.height).toBeLessThanOrEqual(parent.bottom + 1);
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

test('large equal-height cards fill the team screen and scroll without moving navigation', async ({
  page,
}) => {
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1585, height: 1567 },
    { width: 1280, height: 720 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
    const slots = page.getByRole('list', { name: 'Склад команди' }).getByRole('listitem');
    await expect(slots).toHaveCount(11);
    const heights = await slots.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().height),
    );
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(1);
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(220);
    const portraitHeights = await page
      .locator('.member-card .avatar')
      .evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height));
    expect(Math.max(...portraitHeights) - Math.min(...portraitHeights)).toBeLessThan(1);
    await expect(page.locator('.member-card h2')).toHaveText([
      'Андрій',
      'Валентина',
      'Сергій',
      'Галина',
      'Валентина',
      'Олена',
    ]);
    for (const slot of await slots.all()) {
      const box = await slot.boundingBox();
      const card = await slot.locator('.member-card, .placeholder-card').boundingBox();
      expect(card!.width).toBeCloseTo(box!.width, 0);
      expect(card!.height).toBeCloseTo(box!.height, 0);
    }
    const grid = page.getByRole('list', { name: 'Склад команди' });
    const gridBox = await grid.boundingBox();
    const main = await page.locator('main').boundingBox();
    expect(gridBox!.y).toBeGreaterThanOrEqual(main!.y);
    expect(gridBox!.y + gridBox!.height).toBeLessThanOrEqual(main!.y + main!.height);
    if (viewport.height > 1400) expect(gridBox!.height).toBeGreaterThan(800);
    await page.screenshot({ path: `test-results/roster-${viewport.width}-${viewport.height}.png` });
    const overflows = await grid.evaluate((element) => element.scrollHeight > element.clientHeight);
    if (overflows) {
      await expect(
        page.getByText('Прокрутіть, щоб побачити всю команду', { exact: true }),
      ).toBeVisible();
      const footer = await page.locator('.shell-footer').boundingBox();
      await grid.focus();
      await page.keyboard.press('PageDown');
      await expect.poll(() => grid.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
      // Finish native keyboard scrolling before testing the wheel separately.
      await page.keyboard.press('PageUp');
      await expect.poll(() => grid.evaluate((element) => element.scrollTop)).toBe(0);
      await page.mouse.move(gridBox!.x + gridBox!.width / 2, gridBox!.y + gridBox!.height / 2);
      await page.mouse.wheel(0, 10000);
      await expect
        .poll(async () => {
          const box = await slots.last().boundingBox();
          const visible = await grid.boundingBox();
          return box!.y >= visible!.y && box!.y + box!.height <= visible!.y + visible!.height;
        })
        .toBe(true);
      expect((await page.locator('.shell-footer').boundingBox())!.y).toBe(footer!.y);
      await expect(page.getByLabel('Слайд 2 / 10', { exact: true })).toBeVisible();
      await page.screenshot({ path: `test-results/roster-scrolled-${viewport.width}.png` });
    }
  }
});

test('overview shows eleven honest slots and previews a member with pointer or keyboard', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await expect(page.locator('.intro-title')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.member-card')).toHaveCount(6);
  const pending = page.getByRole('list', { name: 'Склад команди' });
  await expect(pending.getByRole('listitem')).toHaveCount(11);
  await expect(page.locator('.placeholder-card')).toHaveCount(5);
  await expect(page.locator('.placeholder-card button')).toHaveCount(0);
  await expect(page.getByText('Готові профілі', { exact: false })).toHaveCount(0);
  await expect(page.locator('.member-card').nth(1).getByText('SQL', { exact: true })).toBeVisible();
  await expect(page.locator('.member-card').nth(3).getByText('AWS', { exact: true })).toBeVisible();
  await expect(page.locator('.member-card').getByText('OutSystems', { exact: true })).toHaveCount(
    0,
  );
  for (let number = 7; number <= 11; number++) {
    await expect(
      pending.getByRole('listitem', {
        name: `Місце для учасника ${number}. скоро знайомство`,
        exact: true,
      }),
    ).toBeVisible();
  }
  const serhii = page.getByRole('button', { name: 'Познайомитися з Сергій', exact: true });
  await serhii.hover();
  await expect(page.getByText('$ git switch team/serhii', { exact: true })).toBeVisible();
  expect(await serhii.evaluate((element) => getComputedStyle(element).transform)).toBe('none');
  await page.mouse.move(0, 0);
  await serhii.focus();
  await expect(page.getByText('$ git switch team/serhii', { exact: true })).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.getByRole('heading', { name: 'Сергій', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  await expect(page.getByLabel('Слайд 2 / 10', { exact: true })).toBeVisible();
  await page.keyboard.press('End');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.summary-count')).toHaveText('11.');
  await expect(page.getByRole('heading', { name: 'учасників', exact: true })).toBeVisible();
});

for (const ready of [5, 8, 11]) {
  test(`overview scales to ${ready} profiles and removes filled placeholders`, async ({ page }) => {
    await page.route('**/src/data/team.ts', async (route) => {
      const response = await route.fetch();
      await route.fulfill({
        response,
        body:
          (await response.text()) +
          `\nteam.splice(${ready}); const fixtures = [...team]; team.push(...Array.from({length: Math.max(0, ${ready} - fixtures.length)}, (_, i) => ({...fixtures[i % fixtures.length], id: "extra-" + i, name: fixtures[i % fixtures.length].name + " " + (i + 2)})));`,
      });
    });
    for (const viewport of [
      { width: 1920, height: 1080 },
      { width: 1280, height: 720 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
      await expect(page.locator('.member-card')).toHaveCount(ready);
      await expect(page.locator('.placeholder-card')).toHaveCount(11 - ready);
      for (const card of await page.locator('.member-card').all()) {
        const box = await card.boundingBox();
        const portrait = await card.locator('.avatar').boundingBox();
        const role = await card.locator('p').first().boundingBox();
        expect(portrait!.height).toBeGreaterThan(20);
        expect(role!.y + role!.height).toBeLessThanOrEqual(box!.y + box!.height + 1);
        expect(role!.x + role!.width).toBeLessThanOrEqual(box!.x + box!.width + 1);
        for (const badge of await card
          .locator('span')
          .filter({ hasText: /^(React|Next.js|Java|SQL|PHP|Go|AWS)$/ })
          .all()) {
          const bounds = await badge.boundingBox();
          expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(box!.y + box!.height + 1);
        }
      }
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
      await page.screenshot({ path: `test-results/team-${ready}-${viewport.width}.png` });
    }
  });
}

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
  for (const member of ['Валентина', 'Сергій', 'Галина', 'Валентина Дрозд', 'Олена Гокун']) {
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('heading', { name: member, exact: true })).toBeVisible();
    await page.screenshot({ path: `test-results/profile-${member}.png` });
  }
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
  for (const member of ['Валентина', 'Сергій', 'Галина', 'Валентина Дрозд', 'Олена Гокун']) {
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('heading', { name: member, exact: true })).toBeVisible();
    await page.screenshot({ path: `test-results/profile-mobile-${member}.png` });
  }
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
  await expect(page.getByRole('heading', { name: 'Валентина', exact: true })).toBeFocused();
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
    'Next.js',
    'TypeScript',
    'C#',
    '.NET',
    'Azure',
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

test('long profile journey labels wrap without truncation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
  await page.getByRole('button', { name: /Познайомитися з Валентина Дрозд/ }).click();
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1280, height: 720 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    for (const label of await page.locator('.member-journey strong').all()) {
      const dimensions = await label.evaluate((element) => ({
        width: element.clientWidth,
        contentWidth: element.scrollWidth,
        height: element.clientHeight,
        contentHeight: element.scrollHeight,
        ellipsis: getComputedStyle(element).textOverflow,
      }));
      expect(dimensions.contentWidth).toBeLessThanOrEqual(dimensions.width + 1);
      expect(dimensions.contentHeight).toBeLessThanOrEqual(dimensions.height + 1);
      expect(dimensions.ellipsis).not.toBe('ellipsis');
    }
  }
});

for (const viewport of [
  { width: 1920, height: 1080 },
  { width: 390, height: 844 },
]) {
  test(`profile sections expand accessibly and preserve the member at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
    await page.getByRole('button', { name: /Познайомитися з Валентина Дрозд/ }).click();
    const trigger = page.getByRole('button', { name: 'Розгорнути розділ «Про мене»' });
    await trigger.focus();
    await page.keyboard.press('Space');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Про мене', exact: true })).toBeVisible();
    await expect(dialog).toContainText('прикладний математик');
    await page.keyboard.press('ArrowRight');
    await expect(dialog.getByRole('heading', { name: 'Досвід', exact: true })).toBeVisible();
    await page.keyboard.press('End');
    await expect(
      dialog.getByRole('heading', { name: 'Після магістратури', exact: true }),
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(
      dialog.getByRole('heading', { name: 'Після магістратури', exact: true }),
    ).toBeVisible();
    await page.keyboard.press('Home');
    await expect(dialog.getByRole('heading', { name: 'Про мене', exact: true })).toBeVisible();
    // Native modal focus stays inside, even when tabbing backwards from its first control.
    await dialog.getByRole('button', { name: 'Закрити розділ' }).focus();
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    const close = dialog.getByRole('button', { name: 'Закрити розділ' });
    await close.focus();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(page.getByRole('heading', { name: 'Валентина Дрозд', exact: true })).toBeVisible();
    // A focused button handles Space once, without advancing the presentation.
    await page.keyboard.press('Space');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Наступний розділ' }).click();
    await expect(dialog.getByRole('heading', { name: 'Досвід', exact: true })).toBeVisible();
    await dialog.getByRole('button', { name: 'Попередній розділ' }).click();
    await expect(dialog.getByRole('heading', { name: 'Про мене', exact: true })).toBeVisible();
    const panel = await dialog.boundingBox();
    expect(panel!.x).toBeGreaterThanOrEqual(0);
    expect(panel!.y).toBeGreaterThanOrEqual(0);
    expect(panel!.x + panel!.width).toBeLessThanOrEqual(viewport.width);
    expect(panel!.y + panel!.height).toBeLessThanOrEqual(viewport.height);
    await page.screenshot({ path: `test-results/profile-focus-${viewport.width}.png` });
    await close.click();
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('heading', { name: 'Знайомтесь. Це ми.' })).toBeVisible();
  });
}

test('section transitions, all answers, future strip, and backdrop work with normal motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Познайомитися', exact: true }).click();
  await page.getByRole('button', { name: /Познайомитися з Валентина Дрозд/ }).click();
  const answers = page.locator('.profile-answer');
  const expected = await answers.evaluateAll((elements) =>
    elements.map((element) => ({
      title: element.querySelector('h2')!.textContent!,
      copy: element.querySelector('.answer-copy')!.textContent!,
    })),
  );
  await answers.first().getByRole('button').click();
  const dialog = page.getByRole('dialog');
  for (let index = 0; index < expected.length; index++) {
    await expect(
      dialog.getByRole('heading', { name: expected[index].title, exact: true }),
    ).toBeVisible();
    await expect(dialog.locator('.focus-answer')).toHaveText(expected[index].copy);
    const copy = await dialog.locator('.focus-answer').boundingBox();
    const footer = await dialog.locator('.focus-footer').boundingBox();
    expect(copy!.y + copy!.height).toBeLessThanOrEqual(footer!.y);
    if (index < expected.length - 1)
      await dialog.getByRole('button', { name: 'Наступний розділ' }).click();
  }
  await page.keyboard.press('Escape');
  // The future strip's arrow also opens its section, using the whole strip as a target.
  const arrow = await page.locator('.member-future-arrow').boundingBox();
  await page.mouse.click(arrow!.x + arrow!.width / 2, arrow!.y + arrow!.height / 2);
  await expect(
    dialog.getByRole('heading', { name: 'Після магістратури', exact: true }),
  ).toBeVisible();
  await page.mouse.click(20, 20);
  await expect(dialog).not.toBeVisible();
  await expect(answers.last().getByRole('button')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { name: 'Олена Гокун', exact: true })).toBeVisible();
});

test('side developer notes stay in the margins and the idea button preserves navigation', async ({
  page,
}) => {
  await page.goto('/');
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 3440, height: 1440 },
    { width: 3840, height: 2160 },
  ]) {
    await page.setViewportSize(viewport);
    const notes = page.getByRole('complementary', { name: 'Нотатки за межами слайда' });
    await expect(notes).toBeVisible();
    const main = await page.locator('main').boundingBox();
    const rails = await notes.locator(':scope > div').all();
    const left = await rails[0].boundingBox();
    const right = await rails[1].boundingBox();
    expect(left!.x).toBeGreaterThanOrEqual(16);
    expect(left!.x + left!.width).toBeLessThanOrEqual(main!.x - 10);
    expect(right!.x).toBeGreaterThanOrEqual(main!.x + main!.width + 10);
    expect(right!.x + right!.width).toBeLessThanOrEqual(viewport.width - 16);
    await page.screenshot({ path: `test-results/side-notes-${viewport.width}.png` });
  }
  await page.setViewportSize({ width: 1920, height: 1080 });
  const idea = page.getByRole('button', { name: 'Ще одна думка про навчання' });
  await idea.focus();
  await page.keyboard.press('Space');
  await expect(
    page.getByText('Хороший prompt починається з хорошого запитання.', { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel('Слайд 1 / 10', { exact: true })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.locator('.side-notes').getByText('$ cat team/README.md', { exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Познайомитися з Сергій', exact: true }).click();
  await expect(
    page.locator('.side-notes').getByText('$ git switch team/serhii', { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Сергій', exact: true })).toBeFocused();
  await page.keyboard.press('End');
  await expect(
    page.locator('.side-notes').getByText('$ git tag next-chapter', { exact: true }),
  ).toBeVisible();
  for (const viewport of [
    { width: 1585, height: 1567 },
    { width: 1280, height: 720 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(page.locator('.side-notes')).toBeVisible();
    await expect(idea).toHaveCount(0);
    const main = await page.locator('main').boundingBox();
    const left = await page.locator('.side-notes > div').first().boundingBox();
    const right = await page.locator('.side-notes > div').last().boundingBox();
    expect(left!.x + left!.width).toBeLessThan(main!.x);
    expect(right!.x).toBeGreaterThan(main!.x + main!.width);
    await page.screenshot({ path: `test-results/side-notes-compact-${viewport.width}.png` });
  }
  for (const viewport of [
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(page.locator('.side-notes')).toBeHidden();
    await expect(idea).toHaveCount(0);
  }
});
