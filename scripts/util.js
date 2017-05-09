const path = require('path');
const glob = require('glob');
const Promise = require('promise');

function dashToUpperCamelCase(str) {
  return str.charAt(0).toUpperCase() +
    str.slice(1).replace(/-[A-Za-z0-9]/g, m => m[1].toUpperCase());
};

function getExampleEntry() {
  return new Promise((resolve, reject) => {
    glob('examples/*/index.js', (err, files) => {
      if (err) {
        reject(err);
      } else {
        const entry = {};

        files.forEach(file => {
          const entryName = path.dirname(file) + path.sep +
              path.basename(file, path.extname(file));
          const entryFile = '.' + path.sep + file;
          entry[entryName] = entryFile;
        });

        resolve(entry);
      }
    });
  });
}

module.exports = {
  dashToUpperCamelCase,
  getExampleEntry,
};
