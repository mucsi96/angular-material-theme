import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://localhost:4272' },
  webServer: {
    command: 'npm start -- --port 4272',
    url: 'http://localhost:4272',
    reuseExistingServer: !process.env['CI'],
  },
});
