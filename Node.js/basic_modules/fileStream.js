var fs = require('fs');

////////////////////////////////////
 // fs - 파일 쓰기
 fs.writeFile('textData.txt', 'Hello World', function(err) {
    if(err) {
        console.error('file save failed : ', err);
        return;
    }
    console.log('file save complete');
 });

 //  fs - 파일 읽기
try {
    var data = fs.readFileSync('./hello.txt', 'utf-8');
    console.log(data);
}
 catch (error) {
    console.error('Error : ', error);
 }


 ////////////////////////////////////
 /*     readFile - 동기적 읽기      */
 var file = 'helloWorld.txt';

 try {          // 파일 존재여부 확인
    fs.accessSync(file, fs.F_OK)
    console.log('파일 존재')
 }
 catch (err) {
    console.log('파일이 존재하지 않음')
    process.exit(1)     // 종료
 }

 try {          // 파일 읽기
    var stats = fs.statSync(file);

    console.log(stats);
    console.log('Create : ', stats['birthtime']);
    console.log('size : ', stats['size']);
    console.log('isFile : ', stats.isFile());
    console.log('isDirectory : ', stats.isDirectory());
    console.log('isBlockDevice : ', stats.isBlockDevice());

    if(stats.isFile()) {
        var data = fs.readFileSync(file, 'utf-8');
        console.log('File Content : ', data);
    }
 }
catch(err) {
    console.error('File error : ', err);
}

/////////////////////////////////////
/*      readFile - 비동기적 읽기    */
fs.access(file, fs.OF_OK, function(err) {
    if(err) {
        console.log('파일 없음');
        process.exit(1)
    }
    else {
        console.log('파일 존재');

        fs.stat(file, function(err, stats) {
            if(err) {
                console.error('File stats error : ', err);
                return;
            }

            console.log(stats);
            console.log('Create : ', stats['birthtime']);
            console.log('size : ', stats['size']);
            console.log('isFile : ', stats.isFile());
            console.log('isDirectory : ', stats.isDirectory());
            console.log('isBlockDevice : ', stats.isBlockDevice());
        
            if(stats.isFile()) {
                fs.readFile(file, function(err, data) {
                    if(err) {
                        console.error('File Read Error', err);
                        return;
                     }
                     // encoding을 작성하지 않으면 Buffer로
                     var str = data.toString('utf-8');
                     console.log('File Contents : ', str);
                });
            }
        });
    }
});

/////////////////////////////////////
/*      readDir - 디렉토리 읽기     */
var path = '.';

fs.readdir(path, function(err, files) {
    if(err) {
        console.error('디렉토리 읽기 에러');
        return;
    }
    console.log('디렉토리 내 파일 목록(Async)\n',  files);
});

//////////////////////////////////////
/*      error - fs 에러             */
// 동기식
try {
    var data = fs.readFileSync('none_exist.txt', 'utf-8');
 }
 catch ( exception ) {
    console.error('Readfile Error : ', exception);
 }
 
 // 비동기식
 fs.readFile('none_exist.txt', 'utf-8', function(err, data) {
     if ( err ) {
         console.error('Readfile error ', err);
     }
     else {
         // 정상 처리        
     }   
 });
 
 
 console.log('에러가 발생해도, 애플리케이션이 크래쉬되지 않고 동작한다.');
 