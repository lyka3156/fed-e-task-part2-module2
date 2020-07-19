import json from "rollup-plugin-json";

// ES Module导出
export default {
    input: "src/index.js",  // 入口文件
    output: {
        file: "dist/bundle.js", // 输出路劲
        format: "iife"  // 输出格式 iife自执行函数
    },
    plugins: [
        json()
    ]
}