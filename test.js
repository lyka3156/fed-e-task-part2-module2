// https://juejin.im/post/5ee03947e51d457889262921
// 题目1                let块级作用域
if (false) {
  var a = 1;
  let b = 2;
}
console.log(a); // undefined
console.log(b); // 报错     b未声明

//  题目2       let 暂时性死区
var a = 1;
if (true) {
  console.log(a);
  let a = 2;
}
// 答案
// 报错 b 未声明之前不能使用        let的暂时性死区特性

// 题目3     引用类型   .运算符 优先级高于 =运算符

var a = { n: 1 };
var b = a;

a.x = a = { n: 2 };

// obj1  {n:1,x:{n:2}}
// obj2 {n:2}

// GO
// a        obj1    obj2
// b        obj1
// a.x = a = {n:2}
// a.x = {n:2}         //  obj.x = {n:2}
// a = {n:2}       // a 改变了新的指向         {n:2}

console.log(a, b); // {n:2}    {n:1,x:{n:2}}
console.log(a.n, b.n); // 2  1
console.log(a.x, b.x); //     undefined {n:2}
// 答案
// 2 1
// undefined  {n:2}

// 题目4        作用域
console.log(c); // function
var c;
function c(a) {
  console.log(a); // function
  var a = 3;
  function a() {}
}
c(2);
// 答案
// function c(a){}
// function a(){}

// 题目5    作用域
var c = 1;
function c(c) {
  console.log(c); // 2
  var c = 3;
}
console.log(c); // 1
c(2); // 报错
// 答案
// 1
// 报错 c is not function

// 题目6        作用域
var name = "erdong";
(function () {
  // AO
  if (typeof name === "undefined") {
    var name = "chen";
    console.log(name); // chen
  } else {
    console.log(name);
  }
})();
// 答案
// chen

// 题目7    作用域 和 this指向
var a = 10;
function test() {
  a = 100;
  console.log(a); // 100
  console.log(this.a); // 10
  var a;
  console.log(a); // 100
}
test();
// 答案
// 100
// 10
// 100

// 题目8        变量提升
// if会进去，a变量提升过了,函数在if里面不会提升，以前会现在不会了
if (!("a" in window)) {
  console.log(333);
  var a = 1;
}
console.log(a); // undefined
// 答案
undefind;

// 题目9        作用域
var a = 1;
function c(a, b) {
  console.log(a); // undefined
  a = 2;
  console.log(a); // 2
}
c();
// 答案
// undefined
// 2

// 题目10           作用域和this指向
var val = 1;
var obj = {
  val: 2,
  del: function () {
    console.log(this); // this指向obj对象
    this.val *= 2;
    console.log(val); // 1
  },
};

obj.del();
// 答案
// {val:2,del:function(){}}
// 1

// 题目11       this指向问题
var name = "erdong";
var object = {
  name: "chen",
  getNameFunc: function () {
    //  object.getNameFunc() 这里的this是object
    return function () {
      // fn() 这里的this是window
      return this.name;
    };
  },
};
console.log(object.getNameFunc()());
// 答案
// erdong

// 题目12       this指向问题
var name = "erdong";
var object = {
  name: "chen",
  getNameFunc: function () {
    //  object.getNameFunc() 这里的this是object
    var that = this;
    return function () {
      return that.name;
    };
  },
};
console.log(object.getNameFunc()());
// 答案
// chen

// 题目13
(function () {
  // 这里的a是局部变量，b是暗示全局变量
  var a = (b = 3);
})();
console.log(typeof a === "undefined"); // true
console.log(typeof b === "undefined"); // false
