const { dependencies } = require('./package.json');

module.exports = {
  name: 'plugin_a',
  filename: 'remoteEntry.js',
  exposes: {
    './PluginA': './src/PluginA.js',
  },
  remotes: {},
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
