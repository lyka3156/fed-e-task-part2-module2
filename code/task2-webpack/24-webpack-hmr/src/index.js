import "./index.css";
import background from "./better.png";
import createEle from "./createEle.js";

console.log("测试热更新功能1");

let ele = createEle();
document.body.appendChild(ele);

const img = new Image();
img.src = background;
document.body.appendChild(img);

console.log("是否开启热更新", module.hot);
