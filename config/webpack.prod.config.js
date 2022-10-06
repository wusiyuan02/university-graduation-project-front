// 生产环境为实现最小bundle的目的
const { merge } = require('webpack-merge');
const webpackConfigCom = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackConfigCom, {
  mode: 'production',
  
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body',
  })]
})