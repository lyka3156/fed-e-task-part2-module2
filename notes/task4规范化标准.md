# 1. 规范化标准

规范化是我们践行前端工程化中重要的一部分

规范化介绍:

- 为什么要规范化
  - 软件开发需要多人协同
  - 不同开发者具有不同的编码习惯和喜好
  - 不同的喜好增加项目维护成本
  - 每个项目或者团队需要明确统一的标准
- 哪里需要规范化标准
  - 代码、文档、甚至是提交日志
  - 开发过程中人为编写的成果物
  - 代码标准化规划最为重要
- 实施规范化的方法
  - 编码前人为的标准约定
  - 通过工具实现 Lint

常用的规范化实现方式

- ESLint 工具使用
- 定制 ESLint 校验规则
- ESLint 对 TypeScript 的支持
- ESLint 结合自动化工具或者 Webpack
- 基于 ESLint 的衍生工具
- StyleLint 工具的使用

# 2. ESLnit

ESLnit 的介绍

- 最为主流的 JavaScript Lint 工具 监测 JS 代码质量
- ESLint 很容易统一开发者的编码风格
- ESLint 可以帮助开发者提升编码能力

ESLint 的安装步骤

- 初始化项目
- 安装 ESLint 模块为开发依赖
``` js
yarn add eslint -D
```
- 通过 CLI 命令验证安装结果
``` js
yarn eslint -v
```


## 2.1 ESLint 快速上手

ESLint 检查步骤

- 编写 "问题" 代码
``` js
// index.js
const name = "zs";
function fn() {
    console.log("hello");

    console.log("eslint");
}
fn(
    syy();
```
- 使用 ESLint 执行检测
``` js
yarn eslint ./index.js
```
- 完成 ESLint 使用配置
``` js
// 1. 第一次需要
yarn eslint --init
// 会出现下面这种情况
// 1.1
To check syntax only      // 检查语法错误(编译不通过)
To check syntax and find problems  // 包含上面的 + 问题代码（使用未定义的变量）
To check syntax, find problems, and enforce code style // 包含上面的 + 代码风格（在编码上存在的问题: 代码缩进....）
// 1.2 
JavaScript modules (import/export)      // ESM
CommonJS (require/exports)            // CommonJS
None  of these                        // 没有用到任何模块化
// 1.3 
React                 
Vue.js
None of these       // 没有用到任何框架
// 1.4 有没有使用到ts
// 1.5 运行在什么环境
Browser
Node
// 1.6 你使用什么风格
use a popular style guide   // 使用市面上主流的风格
answer questions about your style // 通过询问你一些问题来定义你的风格
inspect your javascript file    // 根据你的js代码推断出你的风格
// 1.7 选择风格
airbnb: https://github.com/airbnb/javascript        // 公司自己的
standard: https://github.com/standard/standard      // 开源社区的规范   y 不要分号结尾
google: https://github.com/google/eslint-config-google // 公司自己的
// 1.8 你的配置文件想要什么形式的文件去存放
js
yaml
json
// 1.9 安装插件
// 1.10 会生成一个 .eslintrc.js文件

// 2. 安装完成之后
// 2.1 使用 yarn eslint ./index.js 命令 会把有问题的代码的信息打印出来
// 2.2 使用 yarn eslint ./iindex.js --fix 可以帮我们修复一些问题代码
```


## 2.2 ESLint 配置文件解析
``` js
module.exports = {
  'env': {
    'browser': true,  // 浏览器环境
    'es2020': true,
  },
  // 可以继承多个共享配置
  'extends': [
    'google',
  ],
  // 最高可以使用es11版本,只影响语法检测，不影响语法使用
  'parserOptions': {
    'ecmaVersion': 11,
  },
  // 校验规则的开启
  'rules': {
  },
  // 可以使用的全局成员
  globals: {
  }
};
```

## 2.3 配置注释

[ESLint 配置注释](http://eslint.cn/docs/user-guide/configuring#configuring-rules)

``` js
// eslint-disable-line 忽略这一行的校验
// no-template-curly-in-string  忽略指定的校验规则
const str1 = "${name} is a coder";  // eslint-disable-line no-template-curly-in-string

console.log(str1);
```

## 2.4 ESLint 结合自动化工具

ESLint 结合 gulp 的使用

- 集成之后，ESLint 一定会工作
- 与项目统一，管理更加方便
- https://github.com/zce/zce-gulp-demo.git
- 完成相应的依赖安装
<!-- yarn  -->
- 完成 eslint 的模块安装
<!-- yarn add eslint -D -->
- 完成 gulp-eslint 模块安装
<!-- yarn gulp-eslint -D -->
``` js
// 1. 配置eslint
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.eslint())     // 使用eslint
    .pipe(plugins.failAfterError()) // 打印eslint检查的错误信息
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}
// 2. yarn eslint --init
// 3. yarn gulp script 
```

## 2.5 ESLint 结合 Webpack

前置工作

- https://github.com/zce/zce-react-app.git
- 完成相应的依赖安装
<!-- yarn  -->
- 完成 eslint 的模块安装
<!-- yarn eslint -D -->
- 完成 eslint-loader 模块安装
<!-- yarn eslint-loader -D -->
- 初始化 .eslintrc.js 配置文件
<!-- yarn eslint --init -->

- 配置webpack.config.js
``` js
module.exports = {
  module: {
    rules:[
       {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: "pre" // pre最新执行
      },
    ]
  }
}
```
- 运行webpack     yarn webpack
  - 会提示js文件格式不对

ESLint 结合 Webpack 后续配置
``` js
// 1. 安装eslint-plugin-react 用来校验react文件的语法校验格式
// 2. 配置.eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',   // 这个和下面的两个注释的操作一样的结果
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  // plugins: [
  //   'react',
  // ],
  // rules: {
  //   "react/jsx-uses-react": 2,    // 没有使用react的不报错
  //   "react/jsx-uses-vars": 2    // 没有使用的var的不报错
  // },
};
```

## 2.6 现代化项目集成 ESLint
eslint 结合 vue-cli安装的项目使用
``` js
// 1. 安装插件
npm install @vue/cli -g
// 2. 创建vue项目
vue create vue-eslint 
// 3. 创建完成运行项目
yarn serve
```

## 2.7 ESLint 检查 TypeScript
``` js
// 1. 安装插件 package.json
"devDependencies": {
  "@typescript-eslint/eslint-plugin": "^3.2.0",
  "@typescript-eslint/parser": "^3.2.0",
  "eslint": "^7.2.0",
  "eslint-config-standard": "^14.1.1",
  "eslint-plugin-import": "^2.21.2",
  "eslint-plugin-node": "^11.1.0",
  "eslint-plugin-promise": "^4.2.1",
  "eslint-plugin-standard": "^4.0.1"
},
"dependencies": {
  "typescript": "^3.9.5"
}
// 2. 初始化.eslintrc.js文件
// 3. 配置.eslintrc.js文件
module.exports = {
  parser: "@typescript-eslint/parser"   // ts语法解析器
}
// 4. 使用eslint检查代码
yarn eslint ./index.js
```

## 2.8 衍生工具之 [Standard](https://github.com/standard/standard)

### 2.8.1 Stylelint 的认识

Stylelint 使用介绍

- 提供默认的代码检查规则
- 提供 CLI 工具，快速调用
- 通过插件支持 Sass Less PostCSS
- 支持 Gulp 或 Webpack 集成
``` js
// 1. 安装插件
yarn add stylelint -D
// 2. 创建.stylelintrc.js
// 3. 安装stylelint校验css配置的插件
yarn add stylelint-config-standard 
// 4. 配置.stylelintrc.js
module.exports = {
    extends: "stylelint-config-standard "
}
// 5. 使用stylelint   校验css文件
yarn stylelint ./index.css
// 6. 安装解析sass文件的eslint配置
yarn add stylelint-config-sass-guidelines -D  
// 7. 配置.stylelintrc.js
module.exports = {
    extends: "stylelint-config-standard "
}
// 8. 使用stylelint   校验sass文件
yarn stylelint ./index.sass
```

### 2.8.2 Prettier 的使用

Prettier: 格式化代码的插件

``` js
// 1. 安装插件
yarn add prettier -D
// 2. 打印使用prettier格式化的代码
yarn prettier style.css
// 3. 使用prettier格式化对应文件并且覆盖之前的文件
yarn prettier style.css --write
// 4. 通配符格式化所有问题
yarn prettier . --write
```

### 2.8.3 Git Hooks 介绍      (*****)

代码提交至仓库之前未执行 lint 工作

通过 Git Hooks 在代码提交之前强制 lint

### 2.8.4 Git Hooks 介绍

- Git Hooks 也成为 git 钩子，每个钩子都对应一个任务
  - pre-commit  提交之前执行的钩子
- 通过 shell 脚本可以编写钩子任务触发时要具体执行的操作

ESLint 结合 Git Hooks


很多前端开发者并不擅长使用 shell

Husky 可以实现 Git Hooks 的使用需求
```js
// 1. 安装插件
yarn add eslint husky -D
// 2. 初始化eslintrc.js文件
yarn eslint --init
// 3. 在中package.json配置git-hooks
"scripts": {
  "test": "eslint ./index.js"
},
"husky":{
    "hooks":{
      // 在提交之前会执行npm run test命令
      "pre-commit": "npm run test"
    }
} 
// 4. 执行git命令
git add .
git commit -m "feat: 333" // 执行的时候会先执行npm run test
// 上面的可以实现我们在提交之前使用eslint实现检查代码的操作
// 5. 安装插件
yarn add lint-staged -D
// 6. 配置package.json
"scripts": {
  "test": "eslint ./index.js",
  "precommit": "lint-staged"
},
"husky": {
  "hooks": {
    "pre-commit": "npm run precommit"
  }
},
"lint-staged": {
  "*.js": [
    "eslint",
    "git add"
  ]
}
// 7. 执行命令
git add 
git commit -m "feat: 333"
// 他执行了eslint操作和git add操作,实现了在commit 之前给我们的代码强行执行了eslint操作，同时还能满足后续的需求
```

综上总结：
- 推荐使用husky配合lint-staged，因为这样的话我们自己可以在commit之前强制的去验证我们的代码同时在这之前或者之后完成一系列操作。