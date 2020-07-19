const path = require("path");
const common = require("./webpack.common"); // 导入公共配置
const webpack = require("webpack"); // 引入webpack插件
const { merge } = require("webpack-merge"); // 合并webpack配置
// 2. webpack的开发环境配置
// 在这里使用object.assign({},common,{})  不合适，他会把之前的plugins会覆盖掉
module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  // 配置开发服务器
  devServer: {
    // 设置静态资源访问路劲public
    // contentBase: path.join(__dirname, "public"),
    hot: true, // 启动热更新
  },
  module: {
    rules: [
      // 匹配 css 文件，并通过css-loader模块转换成js模块
      {
        test: /\.less|css$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 匹配图片资源，通过file-loader将图片拷贝到打包目录中
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false, // 解决 vue 打包之后的图片地址 object%20Module
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 使用热更新插件
  ],
});
