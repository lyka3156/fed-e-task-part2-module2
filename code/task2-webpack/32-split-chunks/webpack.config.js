const path = require("path"); // node的核心模块 path
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件

module.exports = {
  mode: "none", // none 源代码模式
  entry: {    // 入口文件
    index: "./src/index.js",
    about: "./src/about.js"
  },
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "[name].js", // 打包之后的文件名称
  },
  // 模块
  module: {
    rules: [
      // 匹配 css 文件，并通过css-loader模块转换成js模块
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // 插件
  plugins: [
    // HtmlWebpackPlugin 通过html模板生成html  默认会将所有入口文件插入到生成的html中
    new HtmlWebpackPlugin({
      title: "首页", // 标题
      template: "./src/index.html", // html模块路劲
      filename: "index.html", // 输出名称
      chunks: ["index"]     // 默认是将所有的打包js引入，可以指定你需要的入口js文件
    }),
    new HtmlWebpackPlugin({
      title: "about", // 标题
      template: "./src/about.html", // html模块路劲
      filename: "about.html", // 输出名称
      chunks: ["about"] // 默认是将所有的打包js引入，可以指定你需要的入口js文件
    }),
  ],
  // 配置优化项
  optimization: {
    // 分隔模块的配置
    splitChunks: {
      chunks: "all"   // 提取所有模块的公共部分
    }
  }
};
