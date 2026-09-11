import { defineConfig } from '@playwright/test';

const serveBuild = process.env['PLAYWRIGHT_SERVE_BUILD'] === 'true';

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: serveBuild ? 'http://localhost:4272/angular-material-theme/' : 'http://localhost:4272/' },
  webServer: {
    command: serveBuild ? 'python3 scripts/serve-gallery.py' : 'npm start -- --port 4272',
    url: 'http://localhost:4272',
    reuseExistingServer: !serveBuild && !process.env['CI'],
  },
});
