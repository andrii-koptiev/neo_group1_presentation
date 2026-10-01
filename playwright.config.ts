import { defineConfig } from '@playwright/test';
// Keep one color preference for Playwright's child processes.
delete process.env.NO_COLOR;
const port = Number(process.env.PLAYWRIGHT_PORT ?? 4287);
const baseURL = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: './tests',
  use: { baseURL, headless: true, reducedMotion: 'reduce' },
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
  },
});
