
const common = require("./webpack.common"); // 导入公共配置
const webpack = require("webpack"); // 引入webpack插件
const { merge } = require("webpack-merge"); // 合并webpack配置
// 2. webpack的开发环境配置
// 在这里使用object.assign({},common,{})  不合适，他会把之前的plugins会覆盖掉
module.exports = merge(common, {
  mode: "none",
  devtool: "source-map",
  // 配置开发服务器
  devServer: {
    hot: true // 启动热更新
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()  // 使用热更新插件
  ]
});