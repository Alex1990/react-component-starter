const path = require('path');
const chalk = require('chalk');
const opn = require('opn');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const util = require('./util');
const getWebpackConfig = require('./getWebpackConfig');

const isInteractive = process.stdout.isTTY;

util.getExampleEntry()
  .then((exampleEntry) => {
    const entry = Object.assign({
      'index': './examples/index.js',
    }, exampleEntry);

    // Configure hot reloading
    for (let entryName in entry) {
      entry[entryName] = [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://127.0.0.1:9000',
        'webpack/hot/only-dev-server',
        entry[entryName],
      ];
    }

    const config = getWebpackConfig({
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
      entry,
      exampleEntry,
      task: 'examples',
    });
    const { devServer = {} } = config;
    const { host = '127.0.0.1', port = '9000' } = devServer;

    const compiler = webpack(config);

    let isFirstCompile = true;

    compiler.plugin('done', stats => {
      if (isInteractive) {
        clearConsole();
      }
      // We have switched off the default Webpack output in WebpackDevServer
      // options so we are going to "massage" the warnings and errors and present
      // them in a readable focused way.
      const messages = formatWebpackMessages(stats.toJson({}, true));
      const isSuccessful = !messages.errors.length && !messages.warnings.length;
      const showInstructions = isSuccessful && (isInteractive || isFirstCompile);

      if (isSuccessful) {
        console.log(chalk.green('Compiled successfully!'));
      }

      isFirstCompile = false;

      // If errors exist, only show errors.
      if (messages.errors.length) {
        console.log(chalk.red('Failed to compile.'));
        console.log();
        messages.errors.forEach(message => {
          console.log(message);
          console.log();
        });
        return;
      }

      // Show warnings if no errors were found.
      if (messages.warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.'));
        console.log();
        messages.warnings.forEach(message => {
          console.log(message);
          console.log();
        });
      }
    });

    const server = new WebpackDevServer(compiler, devServer);

    server.listen(port, host);
    opn(`http://${host}:${port}`);
  })
  .catch(reason => {
    if (reason instanceof Error) {
      console.log(chalk.red(reason.stack));
    } else {
      console.log(chalk.red(reason));
    }
  });
