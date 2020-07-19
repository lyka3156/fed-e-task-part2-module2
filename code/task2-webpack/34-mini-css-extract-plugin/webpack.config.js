const path = require("path"); // node的核心模块 path

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除输出目录的插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css文件到一个单独的文件当中

module.exports = {
  mode: "none", // 源代码模式
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
    new MiniCssExtractPlugin()
  ],
};
