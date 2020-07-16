const path = require("path"); // node的核心模块 path
const webpack = require("webpack"); // webpack自带的插件
module.exports = {
  mode: "none", // development 开发模式   production 生产模式 (默认模式:会压缩js)
  entry: "./src/index.js", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
    // publicPath: "dist/", // 设置加载资源模块的公共路劲(前缀路劲)
  },
  plugins: [
    new webpack.DefinePlugin({
      // 值要求的是一个代码片段   可以用来设置环境变量      注意打包之后变量就不存在了，就只剩下引入这个变量的值了
      API_BASE_URL: JSON.stringify("https://api.example.com"),
      // process.env 命令行中设置的参数
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
      VERSION: new Date().getTime(), //版本号
    }),
  ],
};
