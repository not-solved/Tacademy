//  async => 비동기적 실행
function task1(callback) {
    console.log('Task1 start');
    setTimeout(function () {
        console.log('Task1 end');
        callback('Error', null);
    }, 300);    // 0.3초 뒤 실행
}

function task2(callback) {
    console.log('Task1 start');
    setTimeout(function () {
        console.log('Task1 end');
        callback(null, 'Task2 result');
    }, 200);    // 0.2초 뒤 실행
}

//  비동기적 실행 -> 정해진 대로 기다리고 실행되는 것이 아님
var async = require('async');
async.series([task1, task2], function(err, results) {
    if(err) {
        console.error('Error : ', err);
        return;
    }
    console.log('Async run all terminated ', results);
})