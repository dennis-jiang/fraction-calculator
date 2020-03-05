var path = require('path');

module.exports = function() {
  var isProd = process.env.NODE_ENV === 'production';
  var isPolyfill = !!process.env.POLYFILL;

  var filename = 'fraction-calculator.js';

  var rules = [];

  if (isPolyfill) {
    filename = 'fraction-calculator.polyfill.min.js';
  } else if (isProd) {
    filename = 'fraction-calculator.min.js';
  }

  if (isPolyfill) {
    rules = [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
    ];
  }

  const config = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename,
      library: 'fc',
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: 'typeof window !== "undefined" ? window : this',
    },
    optimization: {
      minimize: isProd,
    },
    module: {
      rules,
    },
  };

  return config;
};
