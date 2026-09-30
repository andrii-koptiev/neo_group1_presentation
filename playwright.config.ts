import { defineConfig } from '@playwright/test';
// Keep one color preference for Playwright's child processes.
delete process.env.NO_COLOR;
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:4287', headless: true, reducedMotion: 'reduce' },
  webServer: {
    command: 'npm run dev -- --port 4287',
    url: 'http://127.0.0.1:4287',
    reuseExistingServer: false,
  },
});
