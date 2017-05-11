const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const util = require('./util');
const getWebpackConfig = require('./getWebpackConfig');

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

util.getExampleEntry()
  .then((exampleEntry) => {
    const entry = Object.assign({
      'index': './examples/index.js',
    }, exampleEntry);

    const config = getWebpackConfig({
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
      entry,
      exampleEntry,
      task: 'examples',
    });

    webpack(config, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
        return;
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }
    });
  })
  .catch(reason => {
    console.log(chalk.red(reason));
    process.exit(1);
  });
