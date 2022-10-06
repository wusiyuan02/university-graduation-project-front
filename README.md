# a simple web program config about webpack
## has config list
- clean-webpack-plugin 删除上一次bundle
- html-webpack-plugin 指定html模板
- react and react-dom 直接npm i即可
- jsx 完成babel-loader配置
- source-map
- css and less...css module
1. 添加.module即可启用css module，原理是给每个类名随机生成一个字符串
2. mini-css-extract-plugin 将css文件以外链的方式加载至html中
3. css-minimizer-webpack-plugin 将css文件中的空格删除
4. 添加less + less-loader可支持less文件的转换

## waiting config list
- mock...
- jest...