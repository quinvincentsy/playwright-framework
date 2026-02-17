import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  retries: 1,
  // workers: 2, // number of parallel test workers
  // projects: [
  //   {
  //     name: 'chrome',
  //     use: {
  //       browserName: 'chromium',
  //       headless: false, // set to true to run headless
  //     },
  //   },
  //   {
  //     name: 'firefox',
  //     use: {
  //       browserName: 'firefox',
  //       headless: false, // set to true to run headless
  //     },
  //   },
  // ],
  use: {
    baseURL: 'https://dev.goreact.com',
    viewport: { width: 1366, height: 768 },
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [
    ['list'],
    ['html']
  ]
});
