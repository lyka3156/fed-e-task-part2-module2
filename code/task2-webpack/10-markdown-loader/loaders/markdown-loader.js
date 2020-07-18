//  自定义loader
// loader是一个函数，这个函数接受一个source源码代码的参数，并且返回对源代码操作之后的值
const marked = require("marked"); // 将markdown文件的解析成html字符串的插件

// 这个sources就是md文件导出的内容                (# 自定义一个解析 md 文件的 loader)
module.exports = (sources) => {
  console.log("自定义loader");
  console.log("源代码内容：", sources);
  // 1. 我们需要将md文件的内容转换成js支持的语法
  const content = marked(sources); // 通过marked将markdown文件转换成html字符串
  console.log(content);
  return content; // 将html传递给下一个loader去解析
  //   return `module.exports = ${JSON.stringify(sources)}`;
  //   return `export default = ${JSON.stringify(sources)}`;
  return JSON.stringify(content);
};

