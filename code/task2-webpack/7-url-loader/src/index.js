console.log("run webpack");

import imgSrc from "./images/1.png";

console.log(imgSrc);

let img = new Image();
img.src = imgSrc;

document.body.append(img);
