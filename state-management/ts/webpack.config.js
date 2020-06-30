const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts'
  },
  output: {
    filename: 'app.js',
    path: path.resolve('./public'),
  },
  devServer: {
    stats: 'errors-only',
    watchContentBase: true,
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
  ],
}