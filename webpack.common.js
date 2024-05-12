const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

const banner = `
${package.name} - ${package.version}
${package.description}
Author: ${package.author}
License: ${package.license}
`;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: banner,
    }),
  ],
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, 'config.js'),
      '@lib': path.resolve(__dirname, 'lib/'),
      '@assets': path.resolve(__dirname, 'assets/'),
      '@core': path.resolve(__dirname, 'src/core/'),
      '@aaos': path.resolve(__dirname, 'src/pages/aaos/'),
      '@aaosEdit': path.resolve(__dirname, 'src/pages/aaosEdit/'),
      '@missions': path.resolve(__dirname, 'src/pages/missions/'),
      '@main': path.resolve(__dirname, 'src/pages/main/'),
      '@package': path.resolve(__dirname, 'package.json'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      }
    ]
  }
};
