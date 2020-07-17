# 1. webpack 打包

[webpack 快速入门](https://www.cnblogs.com/hezihao/p/8072750.html)

> webpack 内部只支持 js 模块

模块打包工具的由来

- ES Modules 存在环境兼容问题
- 模块文件过多，网络请求频繁
- 所有的前端资源都需要模块化
- 毋容置疑，模块化是必须要的

1. 新特性代码编译： 我们需要模块化工具帮我们编译这些代码，开发阶段包含新特性的代码，直接转换为兼容环境的代码，这样一来我们面临环境兼容的问题就不存在了。  
   ![avatar](../images/task2/模块化特性01.png)

2. 模块化 JavaScript 打包： 将这些模块化散落的文件打包到一起,解决了模块文件过来，网络请求频繁的问题
   ![avatar](../images/task2/模块化特性02.png)

3. 支持不同类型的资源模块： 需要支持不同种类的前端资源类型，这样的话我们就可以把前端开发过程当中所涉及到的样式，图片，字体等等所以资源文件都当做模块去使用，对于我们整个应用前端来讲的话就有了统一的模块化方案
   ![avatar](../images/task2/模块化特性03.png)

模块打包工具概要 (Webpack 为例)

- 模块打包器 Module bundler
  - 将零散的代码打包到一起
- 模块加载器 Loader
  - 将那些有环境兼容的代码在打包过程中通过 loader 对其进行编译转换
- 代码拆分 Code Splitting
  - 将代码按照我们的需要去打包，这样就不用担心我们把所以的代码打包到一起，产生的文件比较大的问题，我们可以把引用加载过程当中初次运行的时候所必须的模块打包到一起，对于其他的一些模块单独存放，等到应用工作实际需要到的时候我们再异步加载这个模块，从而实现增量加载或者叫渐进式加载，这样的话我们就不用担心文件太碎或者是太大这两个极端的问题。
- 资源模块 Asset Module
  - webpack 支持在 JavaScript 中以模块化方式载入任意类型的文件

模块化工具的作用：

- 打包工具解决的是前端整体的模块化，并不单指 JavaScript 模块化
- 他可以让我们在开发阶段更好的去享受模块化所带来的优势，同时不用担心模块化对生产环境所带来的影响。

## 1.1 webpack 快速上手

```js
// 1. 安装插件
yarn add webpack webpack-cli -D
// 2. 默认从项目的src的index.js入口打包，打包到dist目录中
yarn webpack
```

### 1.1.1 webpack 配置文件

webpack4.0 以后支持 0 配置打包项目，按照约定将 src/index.js -> dist/main.js 中

很多时候我们需要自定义这些路劲，这时候就需要为 webpack 项目添加 webpack.config.js 配置文件，这个文件是运行在 node.js 环境的文件，所以我们需要 module.exports 导出

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

mode: production 生产模式下，自动优化打包结果
mode: development 开发模式下，自动优化打包速度，添加一些调试过程中的辅助；
mode: none 模式下，运行最原始的打包，不做任何额外处理;

```js
// 1. 配置文件方式
module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js) none 最原始的代码，不做额外的打包
};
// 2. 命令行参数
yarn webpack --mode development
```

### 1.1.3 webpack 打包运行结果

1. 打包之后的文件，整体生成的代码是一个立即执行函数,这个函数是 webpack 的工作入口，接受一个 modules 的参数，调用的时候我们传入一个数组，展开数组，数组的每一项都是一个参数列表相同的函数，这里的函数对应的是我们源代码对应的模块，也就是说我们每一个模块最终都会被包裹到这样的函数当中，从而去实现模块的私有作用域。
2. 展开这个立即执行函数

- 定义了一个对象去缓存我们加载过的模块，紧接着定义了一个 require 的函数，这个函数就是来加载模块的，再往后了就是在 require 函数挂载一些其他的数据和工具函数，这个函数执行到最后会调用 require 这个函数，传入了一个 0 开始去加载我们的模块，这个地方的模块 id 实际上就是我们上面模块数组当中的元素下标，也就是说这里才开始去加载我们源代码当中所谓的入口模块。

3. 自己 chrome 调试下 **\***

```js
(function (modules) {
  // The module cache
  var installedModules = {};
})([
  function (module, exports) {
    console.log("run webpack");
    /***/
  },
]);
```

### 1.1.4 资源模块加载

![avatar](../images/task2/资源模块加载.png)

通过上面图所得，webpack 内部的 loader 只能加载 js 文件，我们如果有其他的文件就需要其他的 loader 去加载对应的文件，转换成 js 模块

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
- 逻辑合理，JS 确实需要这些资源文件
- 确保上线资源不缺少，都是必要的

通过 import 导入模块 如下图所示：

![avatar](../images/task2/导入模块资源.png)

将 js 文件作为打包入口，然后在 js 代码当中通过 import 引入其他资源文件，这样的话其他资源文件也能正常工作，我们来尝试下，如下图代码:

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

例如: 拷贝图片资源,webpack 不支持图片文件模块，所以使用 file-loader 将突破文件转换成 js 模块。 如下图所示：

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

Data URLs 特性的 url 协议，可以直接去表示一个文件，传统的形式需要服务器有个文件，我们通过请求这个地址得到服务器上对应的文件，而 Data URLs 是一种当前用 url 就可以表示文件内容的一种方式， 这种 url 的文本就已经包含了文件的内容，我们在使用这种这种 url 的时候不会再去发送任何的 http 请求

![avatar](../images/task2/Data-URls.png)

```js
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

- 小文件使用 Data URLs,减少请求次数 小于 10kb
- 大文件单独提取存放，提高加载速度 超出 10kb

### 1.1.8 常用加载器分类

1. 编译转换类 将加载的资源转换成 js 模块

- 例如 css-loader 将 js 文件 转换成 js 文件
  ![avatar](../images/task2/css-loader.png)

2. 文件操作类 将加载的资源拷贝到输出目录，同时又将这个文件的访问路劲向外导出

- 例如 file-loader 将文件拷贝到打包目录，并且导出文件访问路劲
  ![avatar](../images/task2/file-loader.png)

3. 代码检查类 对我们所加载的资源文件对代码进行校验的加载器，目的是统一我们代码的风格，从而提高代码的质量，这种加载器一般不会去修改我们生产环境的代码

- 例如 eslint 检查代码的合法性
  ![avatar](../images/task2/eslint-loader.png)

### 1.1.9 webpack 与 es6

webpack 只会做模块的打包工作，因为模块打包需要，所以需要处理 import 和 exprot，并不会去转换我们代码中其他 es6 的特性

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

webpack 会根据配置找到打包入口文件，一般情况下这个文件都会是一个 js 文件，然后他会顺着我们入口文件的代码根据代码中出现的 import 或者 require 之内的语句解析推断出来这个文件所依赖的资源模块，然后分别去解析每个资源模块对应的依赖，最后形成整个项目用到文件的依赖关系的依赖树，有了这个依赖关系的依赖树之后，webpack 会递归这个依赖树，然后找到每个节点对对应的资源文件，最后根据我们配置文件的 rule 属性去找到这个模块所对应的加载器，去交个这个加载去加载这个模块，最后会将加载到的结果放到 build.js 也就是我们打包结果当中从而去实现我们整个项目的打包。(整个过程中 Loader 机制起到了很大的作用，因为没有 loader 的话，他就不能实现这种资源文件的加载，对于 webpack 来说他就只能算是去用来打包和合并 js 模块的工具了。)

Loader 机制是 Wepback 的核心

- 整个过程中 Loader 机制起到了很大的作用，因为没有 loader 的话，他就不能实现这种资源文件的加载，对于 webpack 来说他就只能算是去用来打包和合并 js 模块的工具了。

### 1.1.12 webpack 开发一个 loader

以创建一个解析 markdown 文件的 loader

- 默认 webpack 只识别 js 模块，所以我们要写一个 loader 去将 markdown 文件转换成 js 模块

```js
// 1. 自定义解析markdown文件的loader
// 1.1 loader是一个函数，这个函数接受一个source源码代码的参数，并且返回对源代码操作之后的值
// markdown-loader.js
// 1.2 安装 marked 插件用来解析 markdown文件
yarn add marked -D
// loader是一个函数，这个函数接受一个source源码代码的参数，并且返回对源代码操作之后的值
const marked = require("marked"); // 将markdown文件的解析成html字符串的插件
// 这个sources就是md文件导出的内容                (# 自定义一个解析 md 文件的 loader)
module.exports = (sources) => {
  console.log("自定义loader");
  console.log("源代码内容：", sources);
  // 1. 我们需要将md文件的内容转换成js支持的语法
  const content = marked(sources); // 通过marked将markdown文件转换成html字符串
  console.log(content);
  return content; // 将html传递给下一个loader去解析
  //   return `module.exports = ${JSON.stringify(sources)}`;
  //   return `export default = ${JSON.stringify(sources)}`;
  return JSON.stringify(content);
};
// 2 在webpack种配置loader
// webpack.config.js
const path = require("path"); // node的核心模块 path
module.exports = {
  mode: "development", // development 开发模式   production 生产模式 (默认模式:会压缩js)
  entry: "./src/index.js", // 入口文件
  // 打包目录
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路劲
    filename: "index.js", // 打包之后的文件名称
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        // 将markdown-loader把md文件转换成html字符串，然后将html字符串交给html-loader去处理,html-loader会将html转换成js模块导出
        use: ["html-loader", "./loaders/markdown-loader"],
      },
    ],
  },
};
// 3. 运行 yarn webpack   效果如下
// 3.1 打包之前
// index.js
import note from "./note.md";
console.log(note);

// 3.2 打包过程
// 3.2.1 markdown-loader 将 note.md 文件的内容转换成html字符串
// 使用了marked插件转换
// 3.2.2 html-loader 将 html 字符串转换成js模块导出

// 3.3 打包之后的结果
eval("// Module\nvar code = \"<h1 id=\\\"自定义一个解析-md-文件的-loader\\\">自定义一个解析 md 文件的 loader</h1>\\n\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack:///./src/note.md?");
```

### 1.1.13 webpack 插件

plugin: 增强 webpack 自动化能力

- 清楚 dist 模块
- 拷贝静态文件至输出目录
- 压缩输出代码
  loader: 专注实现资源模块加载
  plugin+loader 实现大多数前端工程化工作。（这也导致初学者都说 webpack 就是前端工程化的理解的原因，这个是不对的。）

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

为什么使用 html-webpack-plugin

> 在此之前我们的 html 都是通过硬编码的方式单独存放在项目的跟目录下，这种方式有两个问题，

- 第一就是我们在项目发布时我们需要同时发布根目录下的 html 文件和 dist 目录下所有打包的结果，这样的话相对麻烦些。上线之后还要确定 html 代码中路劲引用都是正确的。
- 第二个问题是如果说我们输出的目录或者说输出的文件名也就是我们打包结果的配置发生了变化，那 html 代码当中 script 当中所引入的路劲也就需要我们手动去修改
- 以上就是硬编码存在的两个问题，这两个问题的解决办法就是通过 webpack 自动输出 html 文件

html-webpack-plugin 的作用

- 自动生成使用 bundle.js 的 html 的插件
  - 结合 webpack 自动生成我们的 html 文件，html 也参与到 webpack 的构建过程,那在构建过程中它知道它生成了多少个 bundle，自动将这些打包的 bundle 添加到我们的页面当中，一来的话我们 html 也输出到 dist 目录，上线时我们只要把 dist 输出出去就行了。二来我们 html 当中对于 bundle 的引入是动态的注入进来的，不需要我们手动的去硬编码，所以说它可以确保路劲的引入是正确的。
- HtmlWebpackPlugin 通过 html 模板生成 html 默认会将所有入口文件插入到生成的 html 中

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
    template: "./src/index.html", // html模板路劲
    filename: "index.html", // 输出名称
  }),
  // 生成多页面应用
    new HtmlWebpackPlugin({
      title: "副页面", //  自定义标题
      // 添加meta  源数据标签
      meta: {
        viewport: "width=device-width",
      },
      template: "./src/index2.html", // html模板路劲
      filename: "index2.html", // 输出名称
    }),
],
}
// 3. index.html
<script src="打包之后的js文件路劲"></script>
```

### 1.1.15 copy-webpack-plugin

将静态资源目录拷贝到输出目录

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

### 1.1.17 开发体验问题

![avatar](../images/task2/开发体验问题.png)

在此之前我们是编写源代码，再通过 webpack 打包，运行应用，最后刷新浏览器，周而复始的方式过于原始，如果说我们在实际的开发中还按照这样方式去使用，必然会大大减低我们的效率。

设想：理想的开发环境

- Step1: 以 http server 运行，而不是以文件的形式预览。 (webpack-dev-server)
  - 一来我们可用更接近生产环境的状态
  - 二来我们可能会需要去使用 ajax 之类的一些 api，那这些 api 文件形式去访问不被支持
- Step2: 自动编译 + 自动刷新 (webpack-dev-server 中包含 watch 的功能)
  - 修改源代码后，webpack 可用自动帮我们完成构建，然后我们的浏览器可用自动刷新及时显示最新的效果，这样的话大大减小我们开发中额外的重复操作。
- Step3：提供 Source Map 支持 (devtool:"source-map")
  - 我们运行过程中一旦出现错误，就可以根据错误的堆栈信息快速定位到源代码对应的位置，便于我们调试应用。
- 对于以上功能 webpack 都有对应的实现了。

如何增强我们 webpack 的开发体验

#### 1.1.17.1 watch-mode 实现自动编译

watch 模式的作用

- 监听文件变化，自动重新打包
- 专注编码，不要再去手动完成这些重复的工作了

```js
// 1. 监听入口文件的修改，只有入口文件修改就重新编译，类似 gulp的watch方法
// 1.1)  0配置启动监听
yarn webpack --watch
// 1.2)  也可以手动配置  webpack.config.js
module.exports = {
  // watch的配置
  watchOptions: {
    poll: 1000, // 监测修改时间(ms)
    aggregateTimeout: 500, // 防止重复按键，500毫秒内算按一次  (节流:规定时间内最后一次为准)
    ignored: /node_modules/, // 不检测node_modules里面的文件
  },
}
// 启动监听
yarn webpack --watch
```

#### 1.1.17.2 浏览器实现自动刷新

browser-sync 工具可用实现浏览器自动刷新

```js
// 1. 利用 browser-sync 开启一个静态服务器，并监听一个目录变化，只要文件变化将自动刷新
// 1.1) 全局安装 browser-sync
yarn browser-sync -g
// 1.2) 运行脚本      启动一个静态服务器，并监听服务dist目录的变化，只要dist目录变化浏览器将自动刷新
browser-sync start --server --files dist
```

运行效果如下图所示：

![avatar](../images/task2/watch-browsersync.png)

以上两种方式有很多弊端

- 操作上太麻烦了，要同时使用两个工具
- 开发效率上降低了，在这个过程中 webpack 会不断将文件写入磁盘，browser-sync 在从磁盘当中把它读出来，这个过程当中一次会多出两次读写操作。

### 1.1.18 dev-server

webpack-dev-server

- 提供用于开发的 http server
- 集成 自动编译(watch) 和 自动刷新浏览器(类似 browser-asyn) 等功能
- 解决了上面 watch + brower-sync 的弊端
  - 解决了操作上的麻烦，不用同时使用两个工具
  - 解决了开发效率上的问题，他会把打包的结果暂时存放在内存中，而内部的 http-server 就是从内存当中把内存中的文件读取出来然后发送给浏览器，这样可用减少很多不必要的磁盘操作，从而大大提高我们的构建效率。

```js
// 1. 安装插件
yarn add webpack-dev-server -D
// 2. 直接运行
webpack-dev-server
```

contentBase 配置额外为开发服务器指定查找静态资源目录 (**\***)

> 一般我们会把 CopyWebpackPlugin 插件留在上线前的一次打包中使用，那在平时的开发过程中我们一般不会去使用它，这是因为在开发过程中我们会频繁重复去执行打包任务，假设我们要去拷贝的文件比较多或者是比较大，如果我们没次都去执行这个插件的话，打包过程当中开销会比较大，速度自然会降低了。 代码和运行效果图如下:

```js
// 1. 安装插件
yarn add webpack-dev-server -D
// 2. 配置webpack.config.js
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 拷贝目录插件
module.exports = {
  plugins: [
    // 把目录拷贝到输入目录   开发阶段最好不要使用这个插件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public", //  输入目录
          to: "public", // 输出目录
        },
      ],
    }),
  ]
  // 配置开发服务器
  // devServer会将打包的dist目录存到内存中，并从内存中取
  devServer: {
    // contentBase 配置额外的静态资源路劲 配合开发服务器中不使用CopyWebpackPlugin插件
    contentBase: path.join(__dirname, "public"), // 额外的目录
    open: false, // 打开浏览器
    port: 2080, // 端口号
  },
}
```

![avatar](../images/task2/contentsBase配置静态资源.png)

webpack-dev-server 配置代理服务器 代码如下：

```js
// 1. 安装插件
yarn add webpack-dev-server -D
// 2. 配置webpack.config.js
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 拷贝目录插件
module.exports = {
  plugins: [
    // 把目录拷贝到输入目录   开发阶段最好不要使用这个插件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public", //  输入目录
          to: "public", // 输出目录
        },
      ],
    }),
  ]
  // 配置开发服务器
  // devServer会将打包的dist目录存到内存中，并从内存中取
  devServer: {
    // contentBase 配置额外的静态资源路劲 配合开发服务器中不使用CopyWebpackPlugin插件，减少devServer额外打包任务
    contentBase: path.join(__dirname, "public"), // 额外的目录
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
        changeOrigin: true,      // http 相关的点 post (****)
      },
    },
  },
}
// 3. index.js 中使用
// // http://localhost:xxx/api/users -> https://api.github.com/users

fetch("/api/users")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res.forEach((item) => {
      let p = document.createElement("p");
      p.innerHTML = item.login;
      document.body.appendChild(p);
    });
});
```

### 1.1.19 source-map

通过构建编译之类的操作将开发当中的源代码转换为能在生产环境中运行的代码，这是一种进步，但是这种进步的同时意味着我们在实际当中运行的代码和我们开发阶段所编写的代码之间会有很大的差异，在这种情况下我们需要调试我们的应用，或者是运行过程中出现了错误那我们将无从下手，这是因为我们无论是调试还是报错都是基于转换过后的代码进行的，Source Map 就是解决这类问题最好的办法。

source-map 的作用

- 源代码地图 用来映射我们转换过后的代码与源代码之间的关系，一段转换过后的代码通过转换过程中生成的 source-map 文件就可用逆向得到源代码

通过源代码生成 sourcemap 文件和转换后的代码的关系如下图所示:

![avatar](../images/task2/sourcemap01.png)

通过 sourcemap 文件逆向获取源代码

![avatar](../images/task2/sourcemap02.png)

以 jquery 为例

```js
// 1. 引入以下文件
// jquery-3.4.1.js        源代码
// jquery-3.4.1.min.js    压缩之后的文件
// jquery-3.4.1.min.map   source-map文件
// 2. 在 jquery-3.4.1.min.js 文件最下方加入了对应的source-map文件的引用
// # sourceMappingURL=jquery-3.4.1.min.map
// 3. index.html使用压缩后的jquery文件
<body>
  <p>打开 Chrome 开发人员工具，确保开启了 Source Map 功能， 尝试断点调试</p>
  <script src="jquery-3.4.1.min.js"></script>
  <script>var $body = $(document.body); console.log($body);</script>
</body>
// 4. 在index.html打个断点就可用跳到jqeury源代码当中去
```

运行效果如下图所示:
![avatar](../images/task2/jqery-sourcemap.png.png)

Source Map 解决了源代码与运行代码不一致所产生的问题

### 1.1.20 webpack-source-map

配置 source-map

```js
// 1. webpack.config.js
module.exports = {
  // source-map
  devtool: {
    devtool: "source-map",
  },
};
// 2. 打包之后的目录中有个index.map文件
// index.js文件最后也会加入对应的source-map文件的引用
//# sourceMappingURL=index.js.map
// 3. 我们通过上面转换的map文件去找到源代码进行调试，通过上面的devtool:"source-map"的方式还差的远，因为webpack的devtool支持12种方式
```

webpack 支持 12 种不同的 source-map 方式

### 1.1.21 devtool-diff

不同 devtool 模式的区别

```js
// 1.安装模块
yarn add webpack webpack-cli babel-loader @babel/core @babel/preset-env html-webpack-plugin -D

// 2. 配置webpack.config.js
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
// 3. 启动webpack 打包
yarn webpack
```

### 1.1.22 live-reloading-issue

### 1.1.23 hmr-experience

### 1.1.24 webpack-hmr 模块热更新(热替换)

在开发中使用 devServer 启动开发服务器，当我们改变 css 和 js 会刷新打包刷新浏览器，实现实时编译，这是它的特性。也会有如下几个弊端

- 项目依赖的模块多，我们只改了一个小模块，它打包了所有模块。减低了开发的效率
- 每次打包它都会刷新页面，无法保存页面的实时数据，例如：编辑器

为了解决上面的问题，webpack 提供了模块热更新的功能 (webpack 最大特色之一)

- 只会重新编译改的那个模块，并不会打包编译所有模块
- 页面不会刷新，只会替换更新过的内容

设置 webpack 的模块热更新: 如下步骤所示

```js
// webpack.config.js
// 1. 在devServer中开启热更新
module.exports = {
  // 配置开发服务器
  devServer: {
    hot: true, // 开启热更新模块
  },
};
```

### 1.1.25 production-config

### 1.1.26 merge-config

### 1.1.27 define-plugin

webpack 自带的插件，定义全局变量

```js
// 1. 配置 webpack.config.js
import webpack = require("webpack");
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // 值要求的是一个代码片段   可以用来设置环境变量
      API_BASE_URL: JSON.stringify("https://api.example.com"),
      // process.env 命令行中设置的参数
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
      VERSION: new Date().getTime(), //版本号
    }),
  ],
};
// 2. 在pack.json中配置
// 安装 yarn add cross-env -D
{
  "scripts": {
    "build": "cross-env NODE_ENV=build BUILD_ENV=sit webpack",
  }
}
// 3. 在模块中使用
// index.js
console.log(API_BASE_URL); // https://api.example.com
console.log(NODE_ENV);
console.log(BUILD_ENV);

```

### 1.1.28 tree-shaking

### 1.1.29 tree-shaking-babel

### 1.1.30 side-effects

### 1.1.31 multiple-entry

### 1.1.32 split-chunks

### 1.1.33 dynamic-import

### 1.1.34 mini-css-extract-plugin

### 1.1.35 subsitution
