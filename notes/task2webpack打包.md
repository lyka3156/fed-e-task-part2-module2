# 1. webpack 打包

webpack 内部只支持 js 模块

模块打包工具的由来

模块打包工具概要

## 1.1 webpack 快速上手

### 1.1.1 webpack 配置文件

webpack4.0 以后支持 0 配置打包项目，但是项目必须有给 src 目录，并且目录下有个 index.js 文件，webpack 默认会把这个文件当作入口文件

webpack.config.js 是给用户提供的默认配置文件，如果你不指定 webpack 的 --config 文件配置参数，它会默认去找 webpack.config.js 文件，如果没有它就使用 webpack 内部的默认配置

```js
// webpack.config.js
const path = require("path"); // node的核心模块 path
module.exports = {
  entry: "./src/index.js", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
  },
};
```

### 1.1.2 webpack 工作模式

```js
module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js)
};
```

### 1.1.3 webpack 打包运行结果

### 1.1.4 资源模块加载

因为 webpack 内部只支持加载 js 资源模块，所以其他资源模块加载需要对应的 loader(加载器)
loader 的作用就是将 webpack 不支持的模块转换成 js 模块
例如: css 资源模块，就需要 css-loader 把 css 转换成 js 模块，注意的是 css-loader 只有转换功能，并不是把 css 插入到 html 页面中，我们要辅助 style-loader 将 css 插入到 html 的 style 标签中 代码如下:

```js
// 1. 需要安装 css-loader 将css模块转换成js模块
yarn add css-loader -D
// 2. 安装 style-loader 将css追加到 style标签中         (会生成injectStylesIntoStyleTag.js -> 将样式注入style标签的js)
yarn add style-loader -D
const path = require("path"); // node的核心模块 path
module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js)
  entry: "./src/index.css", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
  },
  // 模块
  module: {
    rules: [
      // 匹配 css 文件，并通过css-loader模块转换成js模块
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

### 1.1.5 导入模块资源

通过 import 导入模块

```js
// 1. 基于上面的安装
// header.css
.heading {
  padding: 20px;
  background: #343a40;
  color: #fff;
}
// header.js
import "./heading.css";
export default () => {
  const element = document.createElement("h2");
  element.textContent = "Hello world";
  element.classList.add("heading");
  element.addEventListener("click", () => {
    alert("Hello webpack");
  });
  return element;
};
// index.css
body {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 800px;
  background: #f4f8fb;
}
// index.js
// 通过import引入js和css文件模块, 引入的模块必须是js模块，或者是使用对应的loader加载器
import createHeading from "./heading.js";
import "./index.css";                // style-loader css-loader
const heading = createHeading();
document.body.append(heading);
// index.html中引入打包的js文件
// style-loader会自动把css模块插入到style标签中去
<script src="../dist/index.js"></script>
```

![avatar](../images/task2/import-asset.png)

通过上述所得：

- 最终打包的 index.js 文件中包含 js 打包的模块，和通过 css-loader 转换成的模块，以及 通过 style-loader 模块把 css 加入到 html 中的模块
- 必须引入 index.js 必须引入
- 必须使用 style-loader 把 css 添加到 style 标签中，不然 css 样式没效果

### 1.1.6 文件资源加载器

将文件直接拷贝到打包目录中，也需要对应的 loader 去执行

例如: 拷贝图片资源,webpack 不支持图片文件模块，所以使用 file-loader 把图片拷贝到打包目录，并且返回文件的名称。 代码如下

```js
// 1. 安装 file-loader 加载器
yarn add file-loader
// 2. 使用文件

// index.js
import imgSrc from "./images/1.png";      // 返回的是一个文件名称
console.log(imgSrc);            // xxxxx.png
let img = new Image();
img.src = imgSrc;
document.body.append(img);

// webpack.config.js
module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js)
  entry: "./src/index.css", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
    publicPath: "../dist/", // 设置加载资源模块的公共路劲(前缀路劲)
  },
  // 模块
  module: {
    rules: [
      // 匹配图片资源，通过file-loader将图片拷贝到打包目录中
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: ["file-loader"],
      },
    ],
  },
};
```

### 1.1.7 URL 加载器

url-loader 的作用:

- 将小的图片使用 data:image/png;base64,xxxxxx 的形式打包，这种方式减少 http 的请求数量
- 将大的图片还是使用 file-loader 插件拷贝到打包目录中

```js
// 1. 安装 url-loader
yarn add url-loader -D
// 2. 配置webpack.config.js
module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js)
  entry: "./src/index.css", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
    publicPath: "../dist/", // 设置加载资源模块的公共路劲(前缀路劲)
  },
  // 模块
  module: {
    rules: [
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
};
```

### 1.1.8 常用加载器分类

资源文件模块加载器

文件模块加载器

检查加载器

### 1.1.9 webpack 与 es6

使用 babel 将 es6+的语法转换成低级语法

```js
// 1. 安装插件
yarn add @babel/core  -D        // babel核心模块
yarn add babel-loader -D        // babel转换模块
yarn add @babel/preset-env -D   // 将es6转换成es5
// 2. 配置webpack
module.exports = {
    // 模块
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",           // 使用babel-loader加载器
          options: {
            // @babel/preset-env模块将上面匹配到的js模块中的es6+语法转成低级语法
            // @babel/preset-env是plugins的集合
            presets: ["@babel/preset-env"],
            // 等价于
            // plugins: ["@"]
          },
        },
      },
    ]
  }
}
```

### 1.1.10 webpack 加载资源的方式

1.  支持 ES Modules 的 import 声明

2.  支持 CommonJS 的 require 函数

3.  支持 AMD 的 require / define 函数

4.  部分 loader 加载的资源中一些用法也会触发资源模块加载

html-loader

### 1.1.11 webpack 核心工作原理

### 1.1.12 webpack 开发一个 loader

### 1.1.13 自动清除输出目录插件
