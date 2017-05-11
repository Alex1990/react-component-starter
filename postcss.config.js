module.exports = {
  plugins: [
    require('postcss-partial-import')(),
    require('precss')(),
    require('autoprefixer')()
  ]
};
