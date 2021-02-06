//  process를 통한 하드웨어 환경 접근
console.log(process.env);       //  프로세스 환경 
console.log(process.arch);      //  아키텍처 - x32, x64, x86 ...
console.log(process.platform);  //  플랫폼 - window, mac ...

// 0, 1은 node, processAdd.js
var i = process.argv[2];
var j = process.argv[3];
var sum = parseInt(i) + parseInt(j);
console.log(sum); // 8
