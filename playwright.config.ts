import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 * Credentials and test data are read from .env (see .env.example).
 */
export default defineConfig({
  timeout: 30000, // default timeout of a single test
  expect: {
    timeout: 10000, // default timeout of expect assertions
  },
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL ?? "https://demo5.cybersoft.edu.vn",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10000,
  },

  /* Only Chromium is enabled; other browsers are kept commented out. */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
});
