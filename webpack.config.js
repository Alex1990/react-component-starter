const path = require('path');
const getWebpackConfig = require('./scripts/getWebpackConfig');

const config = getWebpackConfig({
  entry: './src/index.js',
});

module.exports = config;
