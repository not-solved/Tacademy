//  promise => 비동기 처리에 사용디는 객체
function task1(fulfill, reject) {
    console.log('Task1 start');
    setTimeout(function () {
        console.log('Task1 end');
        fulfill('Task1 result');
        reject('Task1 error message');
    }, 300);    // 0.3초 뒤 실행
}

function fulfilled(result) {            // 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
    console.log('fulfilled : ', result);
}
function rejected(err) {                // 비동기 처리가 싪패하거나 오류가 발생한 상태
    console.log('rejected : ', err);
}

// task1 실행  이후 결과에 따라 fulfilled, rejected 중 하나 실행
new Promise(task1).then(fulfilled, rejected);