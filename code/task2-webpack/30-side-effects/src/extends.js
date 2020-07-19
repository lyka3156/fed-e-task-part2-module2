


// 为 Number 的原型添加一个扩展方法 
Number.prototype.pad = function (size) {
    let result = this + "";
    while (result.length < size) {
        result = "0" + result;
    }
    return result;
}
// import "./extends";
// 因为这个模块没有到处任何成员，所以不要提取任何成员
// 引入这个文件的时候没有引用pad方法，他是定义在Number原型上的
// 像这种为Number做扩展的操作就属于extends模块的副作用
// 因为在导入模块的时候会为number添加一个方法
// 那此时我们还标识项目中的代码没有副作用的话，那上面这个副作用的代码将不会被打包进去

