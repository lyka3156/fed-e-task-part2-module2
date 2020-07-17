function a(xxx) {
  // 这里的this指向window
  this.x = xxx;
  return this;
}

var x = a(5);
var y = a(6);
console.log(x.x);
console.log(y.x);
