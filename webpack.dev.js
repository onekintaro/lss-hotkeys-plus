const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
//auto debug mode when using npm run dev
const forceDebug = true;

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist-dev'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEBUG_MODE': JSON.stringify(forceDebug)
    }),
  ],
});
