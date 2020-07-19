
# 1. 使用webpack创建vue项目

## 1.1 安装插件
``` js
yarn add webpack webpack-cli file-loader url-loader style-loader css-loader less less-loader
webpack-dev-server clean-webpack-plugin copy-webpack-plugin webpack-merge babel-loader
@babel/core @vue/cli-plugin-babel html-webpack-plugin mini-css-extract-plugin vue-loader  
vue-template-compiler  terser-webpack-plugin optimize-css-assets-webpack-plugin -D
```

## 1.2 将公共webpack配置提取出来
公共配置有：
- entry入口文件
- output打包目录
- module
    - vue-loader加载器将vue模块转换为js模块
    - babel-loader加载器将js新特性转换为浏览器能执行的js代码
- plugins
    - 使用HtmlWebpackPlugin插件将指定html模板文件当成生成的html入口，并且把打包的入口文件引入进来，默认是引入所有的入口js文件，你可以通过chunks指定莫个js文件引入
    - 使用webpack.DefinePlugin插件定义全局变量，可以根据不同打包环境定义不同的服务器地址
    - VueLoaderPlugin在vue-loader中最新版本需要使用次插件
``` js
// 1. webpack的公共配置
const path = require("path"); // node的核心模块 path
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: "./src/main.js", // 入口文件
    // 打包目录
    output: {
        path: path.resolve(__dirname, "dist"), // 绝对路劲
        filename: "bundle.js", // 打包之后的文件名称
    },
    // 模块
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
                exclude: /node_modules/,
            }
        ],
    },
    // 插件
    plugins: [
        // HtmlWebpackPlugin 通过html模板生成html  默认会将所有入口文件插入到生成的html中
        new HtmlWebpackPlugin({
            title: "首页", // 标题
            template: "./public/index.html", // html模块路劲
            filename: "index.html", // 输出名称
            favicon: "./public/favicon.ico",        // 网站图标
        }),
        // 定义全局变量
        new webpack.DefinePlugin({
            // BASE_URL: JSON.stringify("./public/")
        }),
        // vue-loader最新版本需要加这个
        new VueLoaderPlugin()
    ],
};
```

## 1.3 配置dev开发服务器环境配置
dev环境独有的配置
- mode 指定为development开发环境
- devtool 生成source-map文件，便于查找错误
- devServer 配置开发服务器，用于模拟生产服务器运行，更好的调试
    - 启动hot 启动HMR 热替换    提高开发效率
    - 配置contentsBase的访问静态资源目录，配合CopyWebpackPlugin使用
- module
    - 使用style-loader将css文件插入style标签中
    - 使用file-loader将文件拷贝到打包目录
- plugins
    -   new webpack.HotModuleReplacementPlugin()  // 使用热更新插件
``` js
const path = require("path");
const common = require("./webpack.common"); // 导入公共配置
const webpack = require("webpack"); // 引入webpack插件
const { merge } = require("webpack-merge"); // 合并webpack配置
// 2. webpack的开发环境配置
// 在这里使用object.assign({},common,{})  不合适，他会把之前的plugins会覆盖掉
module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    // 配置开发服务器
    devServer: {
        // 设置静态资源访问路劲public
        // contentBase: path.join(__dirname, "public"),
        hot: true // 启动热更新
    },
    module: {
        rules: [
            // 匹配 css 文件，并通过css-loader模块转换成js模块
            {
                test: /\.less|css$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            // 匹配图片资源，通过file-loader将图片拷贝到打包目录中
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        esModule: false,    // 解决 vue 打包之后的图片地址 object%20Module
                    }
                },
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()  // 使用热更新插件
    ]
});
```

## 1.4 配置pro生产服务器环境配置
dev环境独有的配置
- mode 指定为production生产环境
- devtool 不生成source map 文件
- module
    - 使用 MiniCssExtractPlugin.loader将css文件用link标签引入
    - 使用url-loader将小的文件使用Data-URLs形式引入，减少http请求
- plugins
    - CleanWebpackPlugin  打包之前清除打包目录
    - CopyWebpackPlugin   拷贝静态资源文件，配合devServer的contentsBase使用
    - MiniCssExtractPlugin 使用link引入css的插件
- optimization  优化项
    - usedExports 只打包导入
    - minimizer
    - minimizer  
        - OptimizeCssAssetsWebpackPlugin   压缩css模块 
        - TerserWebpackPlugin              压缩js模块
``` js
const common = require("./webpack.common"); // 导入公共配置
const webpack = require("webpack"); // 引入webpack插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除目录的插件
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 引入拷贝目录的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  // 将样式使用link引入
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");   // 压缩css
const TerserWebpackPlugin = require("terser-webpack-plugin");   // 压缩js
const { merge } = require("webpack-merge"); // 合并webpack配置
// 3. webpack的生产环境配置
module.exports = merge(common, {
    mode: "production",   // 生产环境模式
    devtool: "none",      // 关闭 source map
    module: {
        rules: [
            // 匹配 css 文件，并通过css-loader模块转换成js模块
            {
                test: /\.less|css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, "css-loader", "less-loader"],
            },
            // 匹配图片资源，通过file-loader将图片拷贝到打包目录中
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                use: {
                    // 超过10mb就使用file-loader拷贝过去
                    // 小于10mb就使用url-loader通过Data-URLs直接引入
                    loader: "url-loader",
                    options: {
                        esModule: false,    // 解决 vue 打包之后的图片地址 object%20Module
                        limit: 10 * 1024,
                        // name: "[name:8].[ext]"
                        // outputPath: "image/",
                        // publicPath: ".."
                    }
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 清空打包目录
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: "public", //  输入目录
        //             to: "public", // 输出目录
        //         },
        //     ],
        // }),
        new MiniCssExtractPlugin({
            // link引入的css名称
            filename: "main.css"
        })
    ],
    // 配置优化项
    optimization: {
        // webpack的production模式会自动压缩js(TerserPlugin)
        // 如果设置了minimizer，webpack不会自动压缩js了，就需要手动压缩js了
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),   // 压缩css
            // 压缩js
            new TerserWebpackPlugin({
                terserOptions: {
                    parallel: true, // 并行压缩
                    cache: true,            // 启动缓存
                    compress: { warnings: false, drop_console: false },
                }
            })
        ],
        usedExports: true,  // 只使用导入的
    }
});
```