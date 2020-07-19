const path = require("path"); // node的核心模块 path

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除输出目录的插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css文件到一个单独的文件当中
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");  // 压缩css的插件
const TerserWebpackPlugin = require("terser-webpack-plugin");  // 压缩js的插件

module.exports = {
  mode: "production", // 源代码模式
  entry: "./src/index.js", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
  },
  // 模块
  module: {
    rules: [
      // 匹配 css 文件，并通过css-loader模块转换成js模块
      {
        test: /\.css$/,
        use: [
          // "style-loader",   // 将样式通过style标签注入    开发模式用
          MiniCssExtractPlugin.loader,  // 将样式通过link标签注入 生产环境用
          "css-loader"
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    // HtmlWebpackPlugin 通过html模板生成html  默认会将所有入口文件插入到生成的html中
    new HtmlWebpackPlugin({
      title: "首页", // 标题
      template: "./src/index.html", // html模块路劲
      filename: "index.html", // 输出名称
    }),
    new MiniCssExtractPlugin(),
    // new OptimizeCssAssetsWebpackPlugin()
  ],
  // 优化项配置
  optimization: {
    // webpack建议将这种压缩内的插件配置在minimizer当中，以便于我们通过minimizer这个选项去统一控制
    // 如果配置了minimizer这个数组，要自定义所使用的压缩插件，内部的js压缩器就会被覆盖掉，不会压缩js了
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
};
