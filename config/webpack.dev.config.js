// 开发环境具有实时加载，热更新模块替换的source map 和 localhost server
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfigCom = require('./webpack.common.config.js');

module.exports = merge(webpackConfigCom, {
  mode: 'development',

  devtool:'inline-source-map',

  devServer: {
    static: path.join(__dirname, '../dist'),
    port: 9000,
    compress: true,
    open: true
  },
  
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body',
    minify: false
  })],

  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  }
})