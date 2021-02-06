// Timeout
function sayHello() {
    console.log('Hello World');
}

setTimeout(function() {
    sayHello();
}, 2 * 1000);       //  2초 뒤에 실행

//  Time interval
function sayGoodBye(who) {
    console.log('Good bye ', who);
}
setInterval(sayGoodBye, 1 * 1000, 'Friend');    // 1초에 1회 반복