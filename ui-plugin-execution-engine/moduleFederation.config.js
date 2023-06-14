const { dependencies } = require('./package.json');

module.exports = {
  name: 'pluginEngine',
  filename: 'remoteEntry.js',
  exposes: {
    './ExecutionEngine': './src/ExecutionEngine.js',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      import: 'react',
      shareScope: 'default',
      requiredVersion: dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: dependencies['react-router-dom'],
    },
  },
};
