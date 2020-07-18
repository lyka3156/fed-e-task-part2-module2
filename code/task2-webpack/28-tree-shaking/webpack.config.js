const path = require("path"); // node的核心模块 path

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除输出目录的插件
module.exports = {
  entry: "./src/index.js", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
    // publicPath: "dist/", // 设置加载资源模块的公共路劲(前缀路劲)
  },
  // 配置优化项
  optimization: {
    // mode为production会自动开启以下两个配置
    usedExports: true,   // 只导出外部使用的成员
    minimize: true    // 开启代码压缩功能，压缩没有使用过的代码
    // concatenateModules: true,  // 尽可能的将所有模块合并输出到一个函数中,既提升了运行效率，又减少了代码的体积 (Scope Hoisting 作用域提升)
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
