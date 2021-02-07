//  callback hell   =>  콜백 함수를 연속해서 사용할 때 발생하는 문제
//                      이를 해결하기 위해 Async, Promise 등이 사용된다.

function task1(callback) {
	console.log('Task1 시작');
	setTimeout(function() {
		console.log('Task1 끝');
		callback();
	}, 300);
}

function task2(callback) {
	console.log('Task2 시작');
	setTimeout(function() {
		console.log('Task2 끝');
		callback();
	}, 200);
}

// 콜백 안에 콜백이 존재하는 구조
task1(function() {
	task2(function() {
		
	});
});