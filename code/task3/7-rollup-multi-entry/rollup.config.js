
// ES Module导出
export default {
    input: {
        index: "src/index.js",
        index2: "src/index2.js"
    },  // 入口文件
    output: {
        dir: "dist",        // 代码拆分的时候指定dir目录
        format: "amd"       // 代码拆分不能使用iife,只能使用amd,commonjs等..
    },
}