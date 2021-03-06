const path = require("path"); // node的核心模块 path

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除输出目录的插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 用来拷贝静态资源目录
const webpack = require("webpack");



// 1. 配置文件根据环境不同导出不同配置
// env 运行cli传递的环境参数
// argv 运行cli传递的所有参数
module.exports = (env, argv) => {

  // 1.1 开发环境的配置
  const devConfig = {
    mode: "none", // development 开发模式   production 生产模式 (默认模式:会压缩js)   none 源代码模式
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
          use: ["file-loader"],
        },
      ],
    },
    // 插件
    plugins: [
      // HtmlWebpackPlugin 通过html模板生成html  默认会将所有入口文件插入到生成的html中
      new HtmlWebpackPlugin({
        title: "首页", // 标题
        // 添加meta
        meta: {
          viewport: "width=device-width",
        },
        template: "./src/index.html", // html模块路劲
        filename: "index.html", // 输出名称
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    // 配置开发服务器
    devServer: {
      hot: true,
      // hotOnly: true
    },
    // source-map eval
    devtool: "source-map",
  };

  // 1.2 生产环境的配置
  if (env === "production") {
    devConfig.mode = "production";    // 生产环境mode
    devConfig.devtool = false;   // 禁用掉source map
    devConfig.plugins = [
      ...devConfig.plugins,
      new CleanWebpackPlugin(),
      // 开发环境中，在devServer中的contentBase中配置静态目录public，
      // 开发的时候不参与打包，提高编译速度，
      // 生产环境时使用此插件拷贝静态资源目录到打包目录
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public", //  输入目录
            to: "public", // 输出目录
          },
        ],
      })
    ]
  }
  return devConfig;
}

