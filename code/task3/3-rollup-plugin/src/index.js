// 导入模块成员
import { log } from "./logger";
import messgae from "./message";
import { name, version } from "../package.json";


// 使用模块成员
const msg = messgae.hi;
log(msg);
log(name);
log(version);