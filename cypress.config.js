require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report",
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx}",
      "api/automated-tests/**/*.cy.{js,jsx}",
    ],
    supportFile: "cypress/support/e2e.js",
    screenshotsFolder: "evidence/screenshots",
    videosFolder: "evidence/videos",
    video: false,
    screenshotOnRunFailure: true,
    experimentalServiceWorker: false,
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // allure: habilitar después de correr npm install
      // const allureWriter = require("@shelex/cypress-allure-plugin/writer")
      // allureWriter(on, config)
      return config;
    },
  },
  env: {
    allure: false,
    REQRES_URL: process.env.REQUEST_URL,
    REQRES_API_KEY: process.env.REQRES_API_KEY,
    baseUrl: process.env.BASE_URL
  },
});
