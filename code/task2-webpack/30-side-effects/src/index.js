import "./extends";
import "./style.css";
import { add } from "./commons";

// 会出现一个问题
// 因为我们在这载入的是commons下的index.js，index.js中又载入了所有的组件模块
// 这就会导致我们只想载入的add组件，但是所有的组件都会被加载执行。
// side-effects副作用就可以解决此类问题

console.log(add(1, 2));

console.log((8).pad(3));