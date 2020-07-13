console.log("run webpack");

// 1. 支持 ES Modules 的 import 声明

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
