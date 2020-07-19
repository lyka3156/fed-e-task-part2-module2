# 1. Rollup 
Rollup概述
- Rollup 同样是一款ES Module 的打包器， 
- 他也可以将我们项目当中那些散落的细小模块打包为整块的代码
- 从而使得这些划分的模块可以更好的运行在浏览器环境或者node环境
- Rollup 默认只能处理ES Module模块，如果要使用其他方式，需要额外处理

Rollup 与 webpack
- Rollup 与 Webpack 作用类似
- Rollup 更为小巧
- webpack配合一些插件的使用下几乎可以完成我们开发过程中前端工程化的绝大多数工作
- rollup 仅仅是一款 ESM 打包器
- rollup 中并不支持类似 HMR 这种高级特性

Rollup 并不是要与 Webpack 全面竞争，初衷只是想提供一个充分利用 ESM 各项特性的搞笑打包器

## 1.1 快速上手

yarn rollup 文件地址 --format 输出的格式(例如：iife 函数自执行) --file 输出路劲

``` js
// 1. 安装模块
yarn add rollup -D

// 2. 使用 rollup
// 2. 配置package.json
"scripts": {
    "build": "yarn rollup ./src/index.js --format iife --file dist/bundle.js"
}
// 3.dist.bundle.js
(function () {
    'use strict';
    const log = msg => {
        console.log("-------- info ----------");
        console.log(msg);
        console.log("-----------------------");
    };
    var messgae = {
        hi: "hello rollup"
    };
    // 导入模块成员
    // 使用模块成员
    const msg = messgae.hi;
    log(msg);

}());

```
rollup 打包的结果竟然没有任何多余的代码

rollup会自动开启tree shaking的特性将没用到的代码剔除掉不打包，tree shaking最早是在rollup提出的


## 1.2 配置文件
``` js
// 1. rollup.config.js
// ES Module导出
export default {
    input: "src/index.js",  // 入口文件
    output: {
        file: "dist/bundle.js", // 输出路劲
        format: "iife"  // 输出格式 iife自执行函数
    }
}
// 2. package.json
"scripts": {
    // 这两种方式一样的     默认--config后面没有参数的话，会默认找rollup.config.js
    "build-default": "yarn rollup --config",
    "build": "yarn rollup --config rollup.config.js"
}
```

## 1.3 使用插件

下面的需求，Rollup支持使用插件的方式扩展
- 加载其他资源模块
- 导入 CommonJS 模块
- 编译 ECMAScript 新特性 

插件是 Rollup 唯一扩展途径      webpack有loader,plugin,minimizer扩展方式

下面是导入json文件的案例
``` js
// 1. 安装模块
yarn add rollup-plugin-json -D
// 2. rollup-config.json
import json from "rollup-plugin-json";      // 导出的是一个json函数

// ES Module导出
export default {
    input: "src/index.js",  // 入口文件
    output: {
        file: "dist/bundle.js", // 输出路劲
        format: "iife"  // 输出格式 iife自执行函数
    },
    plugins: [
        json()          // 我们把json的结果放到plugins中
    ]
}
// 3. index.js
// 导入模块成员
import { log } from "./logger";
import messgae from "./message";
import { name, version } from "../package.json";        // 导出的就是一个json对象
// 使用模块成员
const msg = messgae.hi;
log(msg);
log(name);
log(version);
```


## 1.4 加载 NPM 模块
rollup默认只能按照文件路劲的方式去加载本地的文件模块，对应node_modules中的那些第三方模块，它并不能像webpack一样直接去通过模块名称导入对应的模块，为了抹平这样的差压，rollup官方提供了rollup-plugin-node-resolve，通过这个插件我们可以在代码当中直接去使用模块名称导入对应的模块
``` js
// 1. 安装插件
yarn add rollup-plugin-node-resolve -D
// 2. rollup.config.js
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";

// ES Module导出
export default {
    input: "src/index.js",  // 入口文件
    output: {
        file: "dist/bundle.js", // 输出路劲
        format: "iife"  // 输出格式 iife自执行函数
    },
    plugins: [
        json(),     // 解析json
        resolve()   // 解析npm模块路劲查找
    ]
}
```

## 1.5 加载 CommonJS 模块
为了兼容有些插件使用了CommonJS规范，rollup官方提供了一个rollup-plugin-commonjs

``` js
// 1. 安装插件
yarn add rollup-plugin-commonjs -D
// 2. rollup.config.js
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";

// ES Module导出
export default {
    input: "src/index.js",  // 入口文件
    output: {
        file: "dist/bundle.js", // 输出路劲
        format: "iife"  // 输出格式 iife自执行函数
    },
    plugins: [
        json(),     // 解析json
        resolve()   // 解析npm模块
    ]
}
```

## 1.6 代码拆分
使用动态导入(Dynamic Imports)的方式实现按需加载，rollup内部会自动处理代码分割(Code Splitting)

它要求我们的format输出格式不能是iife，因为自执行函数他会把所有的模块都放到同一个函数当中，他并不像webpack一样有一些引导的代码，所以说它没办法实现代码拆分。必须使用AMD 或者 Commonjs的标准
``` js
// 1. index.js
// 动态导入实现按需加载
import("./logger").then({ log }=> {
    log("code splitting...");
})

// 2. rollup.config.js
// ES Module导出
export default {
    input: "src/index.js",  // 入口文件
    output: {
        // file: "dist/bundle.js", // 输出路劲
        // format: "iife"  // 输出格式 iife自执行函数
        dir: "dist",        // 代码拆分的时候指定dir目录
        format: "amd"       // 代码拆分不能使用iife,只能使用amd,commonjs等..
    },
}
```

## 1.7 多入口打包
使用了多入口打包，rullup内部会会使用code splitting,所以，foramt输出格式不能是iife了
``` js
// 1. rollup.config.js
// ES Module导出
export default {
    input: {
        index: "src/index.js",
        index2: "src/index2.js"
    },  // 多入口文件
    output: {
        dir: "dist",        // 代码拆分的时候指定dir目录
        format: "amd"       // 代码拆分不能使用iife,只能使用amd,commonjs等..
    },
}
// 2. index.html
// 不能直接加载amd文件，要通过标准库去加载amd文件
<body>
    <!-- AMD 标准格式的输出 bundle 不能直接引用 -->
    <!-- <script src="index.js"></script> -->
    <!-- 需要 Require.js 这样的库 -->
    <script src="https://unpkg.com/requirejs@2.3.6/require.js" data-main="index.js"></script>
</body>
```

## 1.8 选用原则 Rollup / Webpack
Rollup的优点
- 输出结果更加扁平
    - 没有额外的其他代码，执行效率会更高
- 自动移除未引用代码
    - 内部会自动使用tree shaking
- 打包结果依然完成可读
    - 打包的结果和我们手写的代码基本上一致的，正常阅读
Rollup的缺点
- 加载非ESM的第三分模块比较复杂
- 模块最终都被打包到一个函数中，无法实现HMR
- 浏览器环境中，代码拆分功能依赖 AMD 库
    - 因为它的代码拆分必须是 AMD,CommonJS...的格式

如果我们正在开发应用程序，要大量使用第三方模块，同时我们又需要像html这种的功能去提升我们的开发体验，而且我们的应用一旦大了之后还涉及到分包，这些需求rollup在满足上都会有一些欠缺 

如果我们正在开发一个框架或者类库

大多数知名框架 / 库都在使用 Rollup 

社区中希望二者并存
-   希望能让更专业的工具去做更专业的事情

总结：
- webpack 大而全， rollup 小而美
- 应用开发使用 webpack
- 库 / 框架开发使用 rollup

rollup的扁平化输出在webpack中可以使用concatenateModules去完成，也可以实现类似的输出。

# 2 Parcel 零配置前端应用打包

```js
// 1. 安装插件
yarn add parcel-bundler -D
// 2. 使用parcel
yarn parcel src/index.html
```

特点：
1. hmr的功能
``` js
import foo from "./foo";
foo.bar();
// 使用HMR  这个模块和他依赖的模块改变都会使用HMR特性
if (module.hot) {
    module.hot.accept(() => {
        console.log("hmr");
    })
}
```

2. 会自动安装导入的模块
``` js
import $ from "jquery";         // 我们没有安装，他自己会安装
$(document.body).appendTo("<h1>hello word</h1>");
```

3. 支持加载其他类型的模块
``` js
import "./style.css";       // 支持
import logo from "./logo.png";  // 支持
$(document.body).append(`<img src=${logo} />`)
```

4. 支持动态导入，如果你是自动导入也会拆分代码
``` js
import("jquery").then($ => {
    $(document.body).append('<h1>Hello Parcel</h1>');
    $(document.body).append(`<img src=${logo} />`);
})
```

开发环境运行打包
- yarn parcel src/index.html

生产模式运行打包
- yarn parcel build src/index.html

Parcel 首个版本发布于 2017年
- 当时的 Webpack 使用上过于繁琐
- 完全零配置
- 构建速度更快

parcel vs webpack
- 绝大多数还是使用 webpack
- webpack 有更好的生态 
    - 扩展也就更丰富，出现问题我们也更容易去解决
- webpack 越来越好用