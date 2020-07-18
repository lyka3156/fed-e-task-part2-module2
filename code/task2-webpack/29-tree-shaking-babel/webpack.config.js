const path = require("path"); // node的核心模块 path

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
    // 只导出外部使用的成员
    usedExports: true,
    // 开启代码压缩功能，压缩没有使用过的代码
    // minimize: true
    // 尽可能的将所有模块合并输出到一个函数中,既提升了运行效率
    // concatenateModules: true, 
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 强制将@babel/preset-env设置将我们的代码转换成commonjs
              // 如果 Babel 加载模块时已经转换了 ESM，则会导致 Tree Shaking 失效
              // ['@babel/preset-env', { modules: 'commonjs' }]
              // ['@babel/preset-env', { modules: false }]
              // 也可以使用默认配置，也就是 auto，这样 babel-loader 会自动关闭 ESM 转换
              // 为了确保不会转换成commonjs，导致tree shkaing失效，在这里设置modules:false
              ['@babel/preset-env', { modules: 'commonjs' }]
            ]
          }
        },
      },
    ],
  },
};
