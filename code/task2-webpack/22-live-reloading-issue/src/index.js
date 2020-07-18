import "./index.css";
import background from "./better.png";
import createEle from "./createEle.js";

console.log("devServer自动刷新导致的页面状态丢失");

let ele = createEle();
document.body.appendChild(ele);

const img = new Image();
img.src = background;
document.body.appendChild(img);

