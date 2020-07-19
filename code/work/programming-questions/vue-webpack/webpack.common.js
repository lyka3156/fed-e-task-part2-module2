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

