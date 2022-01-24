module.exports = (on, config) => {
  if (config.testingType === 'component') {
    const injectDevServer = require('@cypress/react/plugins/react-scripts');
    injectDevServer(on, config);
  }
  return config;
};
