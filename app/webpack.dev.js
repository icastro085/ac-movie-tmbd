const merge = require('webpack-merge');
const webpackConfig = require('./webpack.common');

module.exports = merge(webpackConfig, {
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    hot: true,
    stats: {
      colors: true,
    },
    contentBase: '/dist',
    host: '0.0.0.0',
    port: 4212,
    proxy: {
      '/api': 'http://ac-movie-api:4211'
    }
  },
});
