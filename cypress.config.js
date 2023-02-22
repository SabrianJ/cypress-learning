const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 6000,
    env: {
      url: 'https://rahulshettyacademy.com'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/Framework/*.js',
  },
});
