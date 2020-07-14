console.log("run webpack");

// 1. 支持 ES Modules 的 import 声明

// import createHeading from "./heading.js";
// import "./index.css";
// import imgSrc from "./images/1.png";

// // 创建header结构的html
// const heading = createHeading();
// // 创建图片
// const img = new Image();
// img.src = imgSrc;
// document.body.append(heading);
// document.body.append(img);

// 2. 支持 CommonJS 的 require 函数
// const createHeading = require("./heading.js").default; // 默认导出的需要使用default属性
// require("./index.css");
// const imgSrc = require("./images/1.png").default;

// // 创建header结构的html
// const heading = createHeading();
// // 创建图片
// const img = new Image();
// img.src = imgSrc;
// document.body.append(heading);
// document.body.append(img);

// 3. 支持 AMD 的 require / define 函数
// define(["./heading.js", "./images/1.png", "./index.css"], (
//   createHeading,
//   imgSrc
// ) => {
//   // 创建header结构的html
//   const heading = createHeading.default();
//   // 创建图片
//   const img = new Image();
//   img.src = imgSrc.default;
//   document.body.append(heading);
//   document.body.append(img);
// });

// require(["./heading.js", "./images/1.png", "./index.css"], (
//   createHeading,
//   imgSrc
// ) => {
//   // 创建header结构的html
//   const heading = createHeading.default();
//   // 创建图片
//   const img = new Image();
//   img.src = imgSrc.default;
//   document.body.append(heading);
//   document.body.append(img);
// });

// 4. 部分 loader 加载的资源中一些用法也会触发资源模块加载
// 4.1 样式代码中的 @import 指令和 url 函数
import "./index.css";

// 4.2 HTML 代码中图片标签的 src
import footerHtml from "./footer.html";

document.write(footerHtml);
