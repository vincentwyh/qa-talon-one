require('module-alias/register')
const { defineConfig } = require('cypress')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const path = require('path')
const enableHtmlReport = process.env.CYPRESS_ENABLE_HTML_REPORT === '1'
const isCI = Boolean(process.env.CI)

module.exports = defineConfig({
  ...(enableHtmlReport ? {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      reportDir: 'test-results/reports',
      reportFilename: 'index',
      overwrite: true,
      html: true,
      json: true,
    },
  } : {}),
  screenshotsFolder: 'test-results/screenshots',
  videosFolder: 'test-results/videos',
  video: false,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  retries: {
    runMode: isCI ? 1 : 0,
    openMode: 0,
  },
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 10000,
  responseTimeout: 30000,
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    specPattern: 'test/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/src/support/e2e.js',
    fixturesFolder: 'test/src/fixtures',
    setupNodeEvents(on, config) {
      if (enableHtmlReport) {
        require('cypress-mochawesome-reporter/plugin')(on);
      }

      on('file:preprocessor', webpackPreprocessor({
        webpackOptions: {
          resolve: {
            alias: {
              '@fixtures': path.resolve(__dirname, 'test/src/fixtures'),
              '@page-actions': path.resolve(__dirname, 'test/src/page-actions/index.js'),
              '@page-objects': path.resolve(__dirname, 'test/src/page-objects'),
              '@step-objects': path.resolve(__dirname, 'test/src/step-objects/index.js'),
              '@helpers': path.resolve(__dirname, 'test/src/helpers'),
              '@test-data': path.resolve(__dirname, 'test/src/test-data'),
            }
          }
        }
      }))

      return config;
    }
  }
})
