const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    'messenger': './src/index.js',
    'messenger.min': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: ['gravity', 'messenger']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sourceMap: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /(\.js)$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
      }
    ]
  }
};
