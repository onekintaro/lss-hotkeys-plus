const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist-dev'),
  },
});
