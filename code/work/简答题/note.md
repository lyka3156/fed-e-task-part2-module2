
# 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

## 1 构建流程主要有哪些环节
1. entry        入口文件
2. module       模块加载器
3. plugins      配置扩展插件，扩展webpack的更多功能。
4. output       输出目录

## 2.  Webpack 打包的整个过程。
webpack 会根据配置找到打包入口文件，一般情况下这个文件都会是一个 js 文件，然后他会顺着我们入口文件的代码根据代码中出现的 import 或者 require 之内的语句解析推断出来这个文件所依赖的资源模块，然后分别去解析每个资源模块对应的依赖，最后形成整个项目用到文件的依赖关系的依赖树，有了这个依赖关系的依赖树之后，webpack 会递归这个依赖树，然后找到每个节点对对应的资源文件，最后根据我们配置文件的 rule 属性去找到这个模块所对应的加载器，去交给这个加载器去加载这个模块，最后会将加载到的结果放到 build.js 也就是我们打包结果当中从而去实现我们整个项目的打包。在整个构建流程中，Webpack会在恰当的时机执行Plugin里定义的逻辑，从而完成Plugin插件的优化任务。



# 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
## 2.1 Loader 和 Plugin 有哪些不同?
1. loader: 专注实现资源模块加载
    - 例如： 加载css,less,scss,png等等资源模块
2. Plugin: 增强 webpack 自动化能力      
    - 例如: 打包之前清除之前的打包目录, 拷贝静态文件至输出目录，压缩打包后的输出代码

## 2.2 请描述一下开发 Loader 和 Plugin 的思路
1. 编写Loader时要遵循单一原则，每个Loader只做一种"转义"工作。 每个Loader的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用this.callback()方法，将内容返回给webpack。 还可以通过 this.async()生成一个callback函数，再用这个callback将处理后的内容输出出去。
2. webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API(例如：assets源文件对象) 改变输出结果。  webpack是通过钩子机制实现的plugin

[webpack面试题](https://blog.csdn.net/I1326/article/details/107231543/)
