const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, 'config.js'),
      '@lib': path.resolve(__dirname, 'lib/'),
      '@assets': path.resolve(__dirname, 'assets/'),
      '@core': path.resolve(__dirname, 'src/core/'),
      '@aaos': path.resolve(__dirname, 'src/pages/aaos/'),
      '@aaosEdit': path.resolve(__dirname, 'src/pages/aaosEdit/'),
      '@mission': path.resolve(__dirname, 'src/pages/mission/')
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
