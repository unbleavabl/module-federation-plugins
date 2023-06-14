const { dependencies } = require('./package.json');

module.exports = {
  name: 'host',
  filename: 'remoteEntry.js',
  exposes: {},
  remotes: {
    pluginEngine: "pluginEngine@http://localhost:3001/remoteEntry.js"
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
