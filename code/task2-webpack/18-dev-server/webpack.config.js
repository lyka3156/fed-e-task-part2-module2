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
    // 把目录拷贝到输入目录   (开发阶段最好不要使用这个插件)
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "src/public", //  输入目录
    //       to: "public", // 输出目录
    //     },
    //   ],
    // }),
  ],
  // 配置开发服务器
  // devServer会将打包的dist目录存到内存中，并从内存中取
  devServer: {
    // contentBase配置的目录不会被打包到内存中，就是直接从contentBase中取，一般静态资源配置所在目录配置在这里，减少开发服务器打包和编译的时间
    contentBase: path.join(__dirname, "src/public"),
    open: false, // 打开浏览器
    port: 2080, // 端口号
    // 配置代理服务器解决跨域问题
    proxy: {
      "/api": {
        // 将带有   xxxxx/api的路劲      =>    https://api.github.com/api
        // http://localhost:2080/api/users -> https://api.github.com/api/users
        target: "https://api.github.com",
        // 最后将   /api  的路劲替换成 ""
        // http://localhost:2080/api/users -> https://api.github.com/users
        pathRewrite: {
          "^/api": "",
        },
        // 不能使用 localhost:2080 作为请求 GitHub 的主机名
        changeOrigin: true,
      },
    },
  },
};
