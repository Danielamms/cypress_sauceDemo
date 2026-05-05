const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  retries: 2,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 120000,
  requestTimeout: 15000,
  responseTimeout: 30000,
  screenshotOnRunFailure: true,
  video: false,

  e2e: {
    testIsolation: true,
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
