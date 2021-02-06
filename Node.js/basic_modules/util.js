//  util
var util = require('util');

var str1 = util.format('%d + %d = %d', 1, 2, (1+2));
console.log(str1);

var str2 = util.format('%s %s', 'Hello', 'NodeJS');
console.log(str2);

//  util -> 상속
function Parent() {
}
Parent.prototype.sayHello = function() {
    console.log('Hello World from Parent Class');
}

var obj = new Parent();
obj.sayHello();

function Child() {
}
// 상속이 일어나는 지점
util.inherits(Child, Parent);

var obj2 = new Child();
obj2.sayHello();