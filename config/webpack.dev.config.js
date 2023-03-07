// 开发环境具有实时加载，热更新模块替换的source map 和 localhost server
const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const webpackConfigCom = require('./webpack.common.config.js')

module.exports = merge(webpackConfigCom, {
  mode: 'development',

  devtool: 'inline-source-map',

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
  }), new ESLintPlugin({
    context: 'src',
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  })],

  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      axios: path.resolve(__dirname, '../node_modules/axios/dist/axios.js'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      src: path.resolve(__dirname, '../src')
    }
  }
})
