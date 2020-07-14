const path = require("path"); // node的核心模块 path

// 3. mode开发模式还是生产模式
module.exports = {
  mode: "none", // development 开发模式   production 生产模式 (默认模式:会压缩js) none 最原始的代码，不做额外的打包
  entry: "./src/index.js", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
  },
};
