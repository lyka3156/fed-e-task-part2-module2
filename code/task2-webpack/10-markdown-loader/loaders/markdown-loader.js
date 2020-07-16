//  自定义loader
// loader是一个函数，这个函数接受一个source源码代码的参数，并且返回对源代码操作之后的值
const marked = require("marked"); // 用来解析markdown文件的插件

module.exports = (sources) => {
  // 这个sources就是md文件导出的内容                (# 自定义一个解析 md 文件的 loader)

  // 我们需要将md文件的内容转换成js支持的语法
  console.log("自定义loader");
  console.log("源代码内容：", sources);

  //   return `module.exports = ${JSON.stringify(sources)}`;
  //   return `export default = ${JSON.stringify(sources)}`;
  return JSON.stringify(sources);
};

// const marked = require("marked");

// module.exports = (source) => {
//   // console.log(source)
//   // return 'console.log("hello ~")'
//   const html = marked(source);
//   // return html
//   // return `module.exports = "${html}"`
//   // return `export default ${JSON.stringify(html)}`

//   // 返回 html 字符串交给下一个 loader 处理
//   return html;
// };
