const path = require("path"); // node的核心模块 path

module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js)
  entry: "./src/index.js", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        // 将markdown-loader把md文件转换成html字符串，然后将html字符串交给html-loader去处理
        use: ["html-loader", "./loaders/markdown-loader"],
      },
    ],
  },
};
