const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getWebpackConfig = require('./getWebpackConfig');

const root = process.cwd();
const examplesDir = path.join(root, 'examples');
const examplesHtml = path.join(examplesDir, 'index.html');

glob('examples/*/index.js', (err, files) => {
  const entry = {};

  files.forEach(file => {
    const entryName = path.dirname(file) + path.sep +
        path.basename(file, path.extname(file));
    const entryFile = '.' + path.sep + file;
    entry[entryName] = [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://127.0.0.1:9000',
      'webpack/hot/only-dev-server',
      entryFile,
    ];
  });

  const config = getWebpackConfig({
    entry,
    task: 'examples',
  });
  const { devServer = {} } = config;
  const { host = '0.0.0.0', port = '9000' } = devServer;
  const server = new WebpackDevServer(webpack(config), devServer);

  server.listen(port, host);
});
