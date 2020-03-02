var webpack = require('webpack');
var path = require('path');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: !!PROD ? 'fraction-calculator.min.js' : 'fraction-calculator.js',
    library: 'fc',
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: !!PROD,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
    ],
  },
};
