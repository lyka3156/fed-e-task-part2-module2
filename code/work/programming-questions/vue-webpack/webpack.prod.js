const common = require("./webpack.common"); // 导入公共配置
const webpack = require("webpack"); // 引入webpack插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除目录的插件
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 引入拷贝目录的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将样式使用link引入
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 压缩js
const { merge } = require("webpack-merge"); // 合并webpack配置
// 3. webpack的生产环境配置
module.exports = merge(common, {
  mode: "production", // 生产环境模式
  devtool: "none", // 关闭 source map
  module: {
    rules: [
      // 匹配 css 文件，并通过css-loader模块转换成js模块
      {
        test: /\.less|css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "less-loader",
        ],
      },
      // 匹配图片资源，通过file-loader将图片拷贝到打包目录中
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: {
          // 超过10mb就使用file-loader拷贝过去
          // 小于10mb就使用url-loader通过Data-URLs直接引入
          loader: "url-loader",
          options: {
            esModule: false, // 解决 vue 打包之后的图片地址 object%20Module
            limit: 10 * 1024,
            // name: "[name:8].[ext]"
            // outputPath: "image/",
            // publicPath: ".."
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 清空打包目录
    // new CopyWebpackPlugin({
    //     patterns: [
    //         {
    //             from: "public", //  输入目录
    //             to: "public", // 输出目录
    //         },
    //     ],
    // }),
    new MiniCssExtractPlugin({
      // link引入的css名称
      filename: "main.css",
    }),
  ],
  // 配置优化项
  optimization: {
    // webpack的production模式会自动压缩js(TerserPlugin)
    // 如果设置了minimizer，webpack不会自动压缩js了，就需要手动压缩js了
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(), // 压缩css
      // 压缩js
      new TerserWebpackPlugin({
        terserOptions: {
          parallel: true, // 并行压缩
          cache: true, // 启动缓存
          compress: { warnings: false, drop_console: false },
        },
      }),
    ],
    usedExports: true, // 只使用导入的
  },
});
