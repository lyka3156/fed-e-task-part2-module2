const path = require("path"); // node的核心模块 path

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除输出目录的插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 拷贝目录插件

module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js)
  entry: "./src/index.js", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
    // publicPath: "dist/", // 设置加载资源模块的公共路劲(前缀路劲)
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

      // 匹配 css 文件，并通过css-loader模块转换成js模块
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 匹配图片资源，通过file-loader将图片拷贝到打包目录中
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024, // 10 kb 以下使用 base64
            },
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    // 把目录拷贝到输入目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public", //  输入目录
          to: "public", // 输出目录
        },
      ],
    }),
  ],
  // watch的配置
  watchOptions: {
    poll: 1000, // 监测修改时间(ms)
    aggregateTimeout: 500, // 防止重复按键，500毫秒内算按一次  (节流:规定时间内最后一次为准)
    ignored: /node_modules/, // 不检测node_modules里面的文件
  },
};
