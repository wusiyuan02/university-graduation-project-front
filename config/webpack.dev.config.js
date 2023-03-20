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
    open: ['http://localhost:9000/#/'],
    proxy: {
      // 配置代理（只在本地开发有效，上线无效）
      '/api': {
        target: 'http://localhost:3001', // 这是本地用node写的一个服务，用webpack-dev-server起的服务默认端口是8080
        pathRewrite: { '/api': '' }, // 后台在转接的时候url中是没有 /api 的
        changeOrigin: true // 加了这个属性，那后端收到的请求头中的host是目标地址 target
      }
    },
    client: {
      overlay: false,
      progress: true
    },
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: false
    }),
    new ESLintPlugin({
      context: 'src',
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    })
  ],

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@apis': path.resolve(__dirname, '../src/apis'),
      '@router': path.resolve(__dirname, '../src/router'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      src: path.resolve(__dirname, '../src')
    }
  }
})
