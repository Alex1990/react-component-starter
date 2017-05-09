const path = require('path');
const getWebpackConfig = require('./scripts/getWebpackConfig');

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const config = getWebpackConfig({
  entry: './src/index.js',
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
});

module.exports = config;
