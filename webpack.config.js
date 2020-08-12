const path = require('path');

module.exports = {
  entry: './src/lib/setup_webpack.js',
  output: {
    path: path.resolve(__dirname, './src/lib/'),
    filename: 'setup_compiled.js',
    library: 'legacyPluginSetup',
    libraryTarget: 'window',
    // libraryExport: 'default'
  },
  mode: 'development',
  watch: true
};
