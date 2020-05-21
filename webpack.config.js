const path = require('path');

module.exports = {
  target: 'web',
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json'],
  },
  devServer: {
    openPage: 'index.html',
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    port: 3000,
    hot: true,
  },
};
