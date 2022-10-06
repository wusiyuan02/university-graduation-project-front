// 生产环境为实现最小bundle的目的
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const webpackConfigCom = require('./webpack.common.config.js');

module.exports = merge(webpackConfigCom, {
  mode: 'production',

  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body',
  }), new MiniCssExtractPlugin({
    filename: 'style/[name]_[hash:6].css'
  })],

  module: {
    rules: [{
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }],
  },

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()]
  }
})