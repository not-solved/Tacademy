//  event
process.on('exit', function() {         // 종료시 발생하는 이벤트
    console.log('Exit 이벤트 on');
});

process.once('exit', function() {       // 종료시 '한번만' 발생하는 이벤트
    console.log('Exit 이벤트 once');
});

process.emit('exit');
process.emit('exit', 0);

//  event - exception
process.on('uncaughtException', function(code) {
    console.log('uncaughtException Event : ', code);
});

sayHello() ;    // <- 정의되지 않은 함수에 따른 uncaughtException 예외처리

//  event - custom
var Person = function() {};

var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(Person, EventEmitter);        // 이벤트발생기를 상속받음

var p = new Person();
p.on('howAreYou', function() {
    console.log('Fine, Thank you and you?');
})

p.emit('howAreYou');        // 이벤트 발생