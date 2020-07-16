const path = require("path"); // node的核心模块 path
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件

// devtool的12种模块的差别
const allModes = [
  "eval",
  "cheap-eval-source-map",
  "cheap-module-eval-source-map",
  "eval-source-map",
  "cheap-source-map",
  "cheap-module-source-map",
  "inline-cheap-source-map",
  "inline-cheap-module-source-map",
  "source-map",
  "inline-source-map",
  "hidden-source-map",
  "nosources-source-map",
];

// 遍历12种模式生成12个devtool模式的配置
module.exports = allModes.map((item) => {
  return {
    mode: "none", // 不使用任何模式
    devtool: item,
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "dist"),
      filename: `js/${item}.js`,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: `${item}.html`,
      }),
    ],
    module: {
      rules: [
        {
          test: "/.js$/",
          use: {
            loader: "babel-loader", // 使用babel-loader
            options: {
              // @babel/preset-env 插件的集合  包含所有es6+的特性
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
});
