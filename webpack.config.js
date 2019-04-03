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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ],
  },
  stats: {
    colors: true,
  },
};
