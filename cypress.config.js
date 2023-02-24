const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { defineConfig } = require('cypress');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

const setupNodeEvents = async (on, config) => {
  // implement node event listeners here
  await addCucumberPreprocessorPlugin(on, config);
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
};

module.exports = defineConfig({
  e2e: {
    projectId: 'MyFirstTest',
    defaultCommandTimeout: 6000,
    env: {
      url: 'https://rahulshettyacademy.com',
    },
    setupNodeEvents,
    // specPattern: 'cypress/integration/BDD/*.feature',
    specPattern: 'cypress/integration/FakeTest/*.js',
  },
});
