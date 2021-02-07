var fs = require('fs');
var os = fs.createWriteStream('./output.txt');

os.on('finish', () => {
    console.log('finish!');
})

var is = process.stdin;     // 키보드에서 입력한 내용
is.pipe(os);                // outputStream으로 연결