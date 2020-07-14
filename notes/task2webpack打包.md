# 1. webpack 打包
> webpack 内部只支持 js 模块

模块打包工具的由来
- ES Modules 存在环境兼容问题
- 模块文件过多，网络请求频繁
- 所有的前端资源都需要模块化
- 毋容置疑，模块化是必须要的

1. 新特性代码编译： 我们需要模块化工具帮我们编译这些代码，开发阶段包含新特性的代码，直接转换为兼容环境的代码，这样一来我们面临环境兼容的问题就不存在了。   
![avatar](../images/task2/模块化特性01.png)

2. 模块化 JavaScript打包： 将这些模块化散落的文件打包到一起,解决了模块文件过来，网络请求频繁的问题
![avatar](../images/task2/模块化特性02.png)

3. 支持不同类型的资源模块： 需要支持不同种类的前端资源类型，这样的话我们就可以把前端开发过程当中所涉及到的样式，图片，字体等等所以资源文件都当做模块去使用，对于我们整个应用前端来讲的话就有了统一的模块化方案
![avatar](../images/task2/模块化特性03.png)


模块打包工具概要  (Webpack为例)
- 模块打包器  Module bundler  
  - 将零散的代码打包到一起 
- 模块加载器 Loader  
  - 将那些有环境兼容的代码在打包过程中通过loader对其进行编译转换
- 代码拆分 Code Splitting
  - 将代码按照我们的需要去打包，这样就不用担心我们把所以的代码打包到一起，产生的文件比较大的问题，我们可以把引用加载过程当中初次运行的时候所必须的模块打包到一起，对于其他的一些模块单独存放，等到应用工作实际需要到的时候我们再异步加载这个模块，从而实现增量加载或者叫渐进式加载，这样的话我们就不用担心文件太碎或者是太大这两个极端的问题。
- 资源模块 Asset Module 
  - webpack支持在JavaScript中以模块化方式载入任意类型的文件 

模块化工具的作用：
- 打包工具解决的是前端整体的模块化，并不单指 JavaScript 模块化
- 他可以让我们在开发阶段更好的去享受模块化所带来的优势，同时不用担心模块化对生产环境所带来的影响。

## 1.1 webpack 快速上手
``` js
// 1. 安装插件
yarn add webpack webpack-cli -D
// 2. 默认从项目的src的index.js入口打包，打包到dist目录中
yarn webpack
```

### 1.1.1 webpack 配置文件

webpack4.0 以后支持 0 配置打包项目，按照约定将 src/index.js -> dist/main.js 中

很多时候我们需要自定义这些路劲，这时候就需要为webpack项目添加webpack.config.js配置文件，这个文件是运行在node.js环境的文件，所以我们需要module.exports导出

```js
// webpack.config.js
const path = require("path"); // node的核心模块 path
module.exports = {
  entry: "./src/index.js", // 入口文件路劲
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 输出所在目录：绝对路劲
    filename: "index.js", // 打包之后的文件名称
  },
};
```

### 1.1.2 webpack 工作模式

```js
// 1. 配置文件方式
module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js) none 最原始的代码，不做额外的打包
};
// 2. 命令行参数
yarn webpack --mode development
```

### 1.1.3 webpack 打包运行结果
1. 打包之后的文件，整体生成的代码是一个立即执行函数,这个函数是webpack的工作入口，接受一个modules的参数，调用的时候我们传入一个数组，展开数组，数组的每一项都是一个参数列表相同的函数，这里的函数对应的是我们源代码对应的模块，也就是说我们每一个模块最终都会被包裹到这样的函数当中，从而去实现模块的私有作用域。 
2. 展开这个立即执行函数 
  - 定义了一个对象去缓存我们加载过的模块，紧接着定义了一个require的函数，这个函数就是来加载模块的，再往后了就是在require函数挂载一些其他的数据和工具函数，这个函数执行到最后会调用require这个函数，传入了一个0开始去加载我们的模块，这个地方的模块id实际上就是我们上面模块数组当中的元素下标，也就是说这里才开始去加载我们源代码当中所谓的入口模块。
3. 自己chrome调试下 *****
``` js
(function(modules){
  // The module cache
	var installedModules = {};
})([(function(module, exports) {
  console.log("run webpack");
/***/ })])
```

### 1.1.4 资源模块加载

![avatar](../images/task2/资源模块加载.png)

通过上面图所得，webpack内部的loader只能加载js文件，我们如果有其他的文件就需要其他的loader去加载对应的文件，转换成js模块

loader 的作用就是将 webpack 不支持的模块转换成 js 模块

例如: css 资源模块，就需要 css-loader 把 css 转换成 js 模块，注意的是 css-loader 只有转换的功能，并不是把 css 插入到 html 页面中，我们要辅助 style-loader 将 css 插入到 html 的 style 标签中 代码如下: 

```js
// 1. 需要安装 css-loader 将css模块转换成js模块
yarn add css-loader -D
// 2. 安装 style-loader 将css追加到 style标签中         (会生成injectStylesIntoStyleTag.js -> 将样式注入style标签的js)
yarn add style-loader -D
const path = require("path"); // node的核心模块 path
module.exports = {
  mode: "none ", 
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
        use: ["style-loader", "css-loader"],  // 从右往左执行
      },
    ],
  },
};
```

### 1.1.5 导入模块资源
根据代码的需要动态引入资源 ，需要资源的不是你的应用，而是你的代码。 (新事物的特点才是突破)
- JavaScript 驱动整个前端应用
- 逻辑合理，JS确实需要这些资源文件
- 确保上线资源不缺少，都是必要的

通过 import 导入模块 如下图所示：

![avatar](../images/task2/导入模块资源.png)

将js文件作为打包入口，然后在js代码当中通过import引入其他资源文件，这样的话其他资源文件也能正常工作，我们来尝试下，如下图代码:

```js
// 1. 基于上面的安装
// header.css
.heading {
  padding: 20px;
  background: #343a40;
  color: #fff;
}
// header.js
import "./heading.css";   // 引入css文件
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
// 通过import引入js和css文件模块, 引入的模块必须是js模块，或者有对应的loader加载器去转换
import createHeading from "./heading.js";
import "./index.css";                // style-loader css-loader
const heading = createHeading();
document.body.append(heading);
// index.html中引入打包的js文件
// style-loader会自动把css模块插入到style标签中去
<script src="../dist/index.js"></script>
```
运行代码的结果如下： 
![avatar](../images/task2/import-asset.png)

通过上述所得：

- 最终打包的 index.js 文件中包含 js 打包的模块，和通过 css-loader 转换成的模块，以及 通过 style-loader 模块把 css 加入到 html 中的模块
- 必须引入 index.js 必须引入
- 必须使用 style-loader 把 css 添加到 style 标签中，不然 css 样式没效果

### 1.1.6 文件资源加载器

将文件直接拷贝到打包目录中，也需要对应的 loader 去执行

例如: 拷贝图片资源,webpack 不支持图片文件模块，所以使用 file-loader 将突破文件转换成js模块。 如下图所示：
- 先将导入的文件拷贝到输出的模块，然后我们的文件输出过后的文件路劲作为当前这个模块的返回值返回

![avatar](../images/task2/文件资源加载器.png)


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

Data URLs 特性的url协议，可以直接去表示一个文件，传统的形式需要服务器有个文件，我们通过请求这个地址得到服务器上对应的文件，而Data URLs 是一种当前用url就可以表示文件内容的一种方式， 这种url的文本就已经包含了文件的内容，我们在使用这种这种url的时候不会再去发送任何的http请求  

![avatar](../images/task2/Data-URls.png)
``` js
// 1. html文件的Data URls 可以直接在网络上运行
data:text/html;charset=UTF-8,<h1>html 文件</h1>

// 2. 图片或者字体无法通过文本去表示的二进制类型的文件，可以将文件的内容进行base64编码，以base64编码过后的结果，也就是字符串去表示这个文件的内容
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAh4AAANaCAYAAADGfUWEAAAgAElEQVR4nOy9C7RdR3km+Nc.....
```
![avatar](../images/task2/html-dataurls.png)
![avatar](../images/task2/img-dataurls.png)


url-loader 的作用:

- 将小的图片使用 Data URls 的形式打包，这种方式减少 http 的请求数量
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
              limit: 10 * 1024, // 10 kb 以下使用 Data URLs加载
            },
          },
        ],
      },
    ],
  },
};
```

最佳实践
- 小文件使用 Data URLs,减少请求次数   小于10kb
- 大文件单独提取存放，提高加载速度    超出10kb

### 1.1.8 常用加载器分类

1. 编译转换类   将加载的资源转换成js模块

- 例如 css-loader 将 js 文件 转换成 js 文件
  ![avatar](../images/task2/css-loader.png)

2. 文件操作类   将加载的资源拷贝到输出目录，同时又将这个文件的访问路劲向外导出

- 例如 file-loader 将文件拷贝到打包目录，并且导出文件访问路劲
  ![avatar](../images/task2/file-loader.png)

3. 代码检查类   对我们所加载的资源文件对代码进行校验的加载器，目的是统一我们代码的风格，从而提高代码的质量，这种加载器一般不会去修改我们生产环境的代码

- 例如 eslint 检查代码的合法性
  ![avatar](../images/task2/eslint-loader.png)

### 1.1.9 webpack 与 es6
webpack只会做模块的打包工作，因为模块打包需要，所以需要处理import和exprot，并不会去转换我们代码中其他es6的特性

使用 babel 将 es6+的语法转换成低级语法

```js
// 1. 安装插件
yarn add babel-loader -D        // babel-loader其实是一个转换的平台
yarn add @babel/core  -D        // babel核心模块
yarn add @babel/preset-env -D   // 具体特性转换插件的集合 (包含了全部es的新特性)
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
总结：
- webpack 只是打包工具
- 加载器可以用来编译转换代码

### 1.1.10 webpack 加载资源的方式

1.  支持 ES Modules 的 import 声明

```js
import createHeading from "./heading.js";
import "./index.css";
import imgSrc from "./images/1.png";

// 创建header结构的html
const heading = createHeading();
// 创建图片
const img = new Image();
img.src = imgSrc;
document.body.append(heading);
document.body.append(img);
```

2.  支持 CommonJS 的 require 函数

```js
const createHeading = require("./heading.js").default; // 默认导出的需要使用default属性
require("./index.css");
const imgSrc = require("./images/1.png").default;

// 创建header结构的html
const heading = createHeading();
// 创建图片
const img = new Image();
img.src = imgSrc;
document.body.append(heading);
document.body.append(img);
```

3.  支持 AMD 的 require / define 函数

```js
define(["./heading.js", "./images/1.png", "./index.css"], (
  createHeading,
  imgSrc
) => {
  // 创建header结构的html
  const heading = createHeading.default();
  // 创建图片
  const img = new Image();
  img.src = imgSrc.default;
  document.body.append(heading);
  document.body.append(img);
});

require(["./heading.js", "./images/1.png", "./index.css"], (
  createHeading,
  imgSrc
) => {
  // 创建header结构的html
  const heading = createHeading.default();
  // 创建图片
  const img = new Image();
  img.src = imgSrc.default;
  document.body.append(heading);
  document.body.append(img);
});
```

4.  部分 loader 加载的资源中一些用法也会触发资源模块加载

- 4.1 样式代码中的 @import 指令和 url 函数

```css
@import url(reset.css);
/*css-loader 同样支持 sass/less 风格的 @import 指令*/
/*@import 'reset.css';*/

body {
  min-height: 100vh;
  background: #f4f8fb;
  background-image: url(./images/background.png);
  background-size: cover;
}
```

@import 和 url 引入的文件模块会使用 module 对应的 rule 的加载器去执行，

- 例如：@import url(reset.css) 中引入的 reset.css 文件会使用 css-loader 加载器将 css 文件转换成 js 模块
- 例如：url(image) 引入的图片会使用 file-loader 将文件拷贝到打包目录，并且返回文件的路劲

- 4.2 HTML 代码中图片标签的 src
  webpack 不支持 html 模块，所以需要使用一个 loader 来将 html 模块转换成 js 模块, html-loader

```js
// 1. 安装html-loader
yarn add html-loader -D
// 2. 配置webpack
{
  test: /\.html$/,
  use: {
    loader: "html-loader",
    // html-loader默认只加载 img:src 引入的文件资源
    // 所以，你如果要使用a:href引用资源，就需要在这里配置
    attributes: {
        list: [
          {
            tag: "img",
            attribute: "src",
            type: "src",
          },
          {
            tag: "a",
            attribute: "href",
            type: "src",
          },
        ],
      }
  },
},
// 3. footer.html
<footer>
  <img src="./images/1.png" alt="better" width="256" />
  <!-- <a href="./images/1.png">download png</a> -->
</footer>
// 4. index.js
import footerHtml from "./footer.html";
document.write(footerHtml);
```

运行如下图所示:
![avatar](../images/task2/html-loader1.png)

![avatar](../images/task2/html-loader2.png)

### 1.1.11 webpack 核心工作原理
![avatar](../images/task2/webpack核心工作原理01.png)

![avatar](../images/task2/webpack核心工作原理02.png)

![avatar](../images/task2/webpack核心工作原理03.png)

webpack会根据配置找到打包入口文件，一般情况下这个文件都会是一个js文件，然后他会顺着我们入口文件的代码根据代码中出现的import或者require之内的语句解析推断出来这个文件所依赖的资源模块，然后分别去解析每个资源模块对应的依赖，最后形成整个项目用到文件的依赖关系的依赖树，有了这个依赖关系的依赖树之后，webpack会递归这个依赖树，然后找到每个节点对对应的资源文件，最后根据我们配置文件的rule属性去找到这个模块所对应的加载器，去交个这个加载去加载这个模块，最后会将加载到的结果放到build.js也就是我们打包结果当中从而去实现我们整个项目的打包。(整个过程中Loader机制起到了很大的作用，因为没有loader的话，他就不能实现这种资源文件的加载，对于webpack来说他就只能算是去用来打包和合并js模块的工具了。)

Loader机制是 Wepback的核心
- 整个过程中Loader机制起到了很大的作用，因为没有loader的话，他就不能实现这种资源文件的加载，对于webpack来说他就只能算是去用来打包和合并js模块的工具了。

### 1.1.12 webpack 开发一个 loader

### 1.1.13 webpack 插件
plugin: 增强webpack 自动化能力
- 清楚 dist 模块
- 拷贝静态文件至输出目录
- 压缩输出代码
loader: 专注实现资源模块加载
plugin+loader 实现大多数前端工程化工作。（这也导致初学者都说webpack就是前端工程化的理解的原因，这个是不对的。）


### 1.1.13 自动清除输出目录插件

```js
// 1. 安装 clean-webpack-plugin
yarn add clean-webpack-plugin -D
// 2. 配置webpack.config.js
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入清除输出目录的插件

module.exports = {
  // 插件 是在摸个时间段执行，相当于生命周期，每个插件都是一个构造函数
  plugins: [new CleanWebpackPlugin({
    dry:true
  })],
}
```

### 1.1.14 html-webpack-plugin

HtmlWebpackPlugin 通过 html 模板生成 html 默认会将所有入口文件插入到生成的 html 中

```js
// 1. 安装html-webpack-plugin
yarn add html-webpack-plugin
// 2. 配置 webpack.config.js
module.exports = {
  plugins: [
  // 生成 index.html
  new HtmlWebpackPlugin({
    title: "首页", // 标题        注意： 不要和html-loader混合着用，不用这个title显示不了了
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
      template: "./src/index2.html", // html模块路劲
      filename: "index2.html", // 输出名称
    }),
],
}
// 3. index.html
<script src="打包之后的js文件路劲"></script>
```

### 1.1.15 copy-webpack-plugin

将目录拷贝到输出目录

```js
// 1. 安装copy-webpack-plugin
yarn add copy-webpack-plugin -D
// 2. 配置webpack.config.js
module.exports = {
  plugins: [
    // 把目录拷贝到输入目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public",     //  输入目录
          to: "public",     // 输出目录
        },
      ],
    }),
  ]
}
```

### 1.1.16 webpack 开发一个 plugin

### 1.1.17 ideal-develop-env

### 1.1.18 watch-mode

### 1.1.19 dev-server

```js
// 1. 安装插件
yarn add webpack-dev-server -D
// 2. 配置webpack.config.js

```

### 1.1.20 source-map

### 1.1.21 webpack-source-map

配置 source-map

```js
// 1. webpack.config.js
module.exports = {
  // source-map
  devtool: {
    devtool: "eval",
  },
};
```

### 1.1.22 devtool-diff

```js
```
