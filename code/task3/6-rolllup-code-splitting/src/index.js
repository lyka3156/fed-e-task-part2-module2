// 1.静态导入
// // 导入模块成员
// import { log } from "./logger";
// import messgae from "./message";
// import { name, version } from "../package.json";
// // import _ from "lodash-es";  // lodash的ES Module版本
// import cjs from "./common"

// // 使用模块成员
// const msg = messgae.hi;
// log(msg);
// log(name);
// log(version);
// // log(_.camelCase("hello lodash"));
// log(cjs);

// 2. 动态导入实现按需加载
import('./logger').then(({ log }) => {
    log('code splitting~')
})