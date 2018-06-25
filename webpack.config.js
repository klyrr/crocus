/* eslint-disable no-var, no-undef */
module.exports = {
  bail: true,
  mode: 'production',
  entry: {
    krokus: './src/index.js',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  stats: {
    colors: true,
  },
};
