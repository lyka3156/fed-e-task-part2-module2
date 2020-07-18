const path = require("path"); // node的核心模块 path

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除输出目录的插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件


// 自定义插件
class MyPlugin {
  // options就是plugin钩子函数的实例参数
  constructor(options) {
    console.log("自定义插件构造函数options");
  }

  // compiler  配置信息的对象
  apply(compiler) {
    // 第一个参数是插件名称
    // 第二个参数compilation => 可以理解为此次打包的上下文
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      // assets 打包之后的源文件对象 main_fd12bf.js: {}
      // options webpack.config.js的配置信息
      for (const name in compilation.assets) {
        // 只解析js文件
        if (name.endsWith('.js')) {
          // key是name(文件名称)    value是文件信息，例如 source返回源文件内容的函数，size返回源文件的大小的函数
          const contents = compilation.assets[name].source()  // 获取源文件内容
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '')  // 替换打包之后的开头注释
          // 将新的内容替换之前的内容
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length
          }
        }
      }
    })
  }
}

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
    // 生成多页面应用
    new HtmlWebpackPlugin({
      title: "副页面", // 标题
      // 添加meta
      meta: {
        viewport: "width=device-width",
      },
      template: "./src/index2.html", // html模板路劲
      filename: "index2.html", // 输出名称
    }),
    new MyPlugin()
  ],
};
