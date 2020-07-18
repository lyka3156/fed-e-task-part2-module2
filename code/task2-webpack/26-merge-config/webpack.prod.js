
const common = require("./webpack.common"); // 导入公共配置
const webpack = require("webpack"); // 引入webpack插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除目录的插件
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 引入拷贝目录的插件
const { merge } = require("webpack-merge"); // 合并webpack配置
// 3. webpack的生产环境配置
module.exports = merge(common, {
  mode: "production",   // 生产环境模式
  devtool: "none",      // 关闭 source map
  plugins: [
    new CleanWebpackPlugin(), // 清空打包目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public", //  输入目录
          to: "public", // 输出目录
        },
      ],
    })
  ]
});