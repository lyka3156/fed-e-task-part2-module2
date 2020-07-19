import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

// ES Module导出
export default {
    input: "src/index.js",  // 入口文件
    output: {
        file: "dist/bundle.js", // 输出路劲
        format: "iife"  // 输出格式 iife自执行函数
    },
    plugins: [
        json(),     // 解析json
        resolve(),   // 解析npm模块路劲查找
        commonjs()      // 解析commonjs
    ]
}