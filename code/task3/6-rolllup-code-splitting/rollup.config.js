

// ES Module导出
export default {
    input: "src/index.js",  // 入口文件
    output: {
        // file: "dist/bundle.js", // 输出路劲
        // format: "iife"  // 输出格式 iife自执行函数
        dir: "dist",        // 代码拆分的时候指定dir目录
        format: "amd"       // 代码拆分不能使用iife,只能使用amd,commonjs等..
    },
}