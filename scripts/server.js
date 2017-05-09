const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const util = require('./util');
const getWebpackConfig = require('./getWebpackConfig');

util.getExampleEntry()
  .then((entry) => {
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
      task: 'examples',
    });
    const { devServer = {} } = config;
    const { host = '127.0.0.1', port = '9000' } = devServer;
    const server = new WebpackDevServer(webpack(config), devServer);

    server.listen(port, host);
  }, (err) => {
    throw err;
  });
