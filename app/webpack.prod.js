const merge = require('webpack-merge');
const webpackConfig = require('./webpack.common');

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
});
