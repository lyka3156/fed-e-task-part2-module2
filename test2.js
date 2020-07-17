var length = 10;

function fn() {
  console.log(this.length); // 10
}

var obj = {
  length: 5,
  method: function (fn) {
    // 这里的this指向obj
    fn();
    // arguments[0]
    // argument.fn();
    arguments[0](); // 10
  },
};
//
obj.method(fn, 1);

// 例子2
function fn() {
  console.log(this.length);
  console.log(arguments[0] && arguments[0]());
}

var a = { length: 10, fn };

a.fn(fn, 2, 4);
