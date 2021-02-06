var pathUtil = require('path');

/*      경로 분석      */

var path = '/foo/bar/baz/asdf/quux.html';

//  /foo/bar/baz/asdf
console.log('dirname : ', pathUtil.dirname(path));  // 경로 이름
//  quux.html
console.log('dirname : ', pathUtil.basename(path)); // 파일 이름
//  .html
console.log('dirname : ', pathUtil.extname(path));  //  확장자

var parsed = pathUtil.parse('/usr/tmp/local/image.png');
console.log('parsed : ', parsed);
console.log('base : ', parsed.base);
console.log('ext : ', parsed.ext);

/*      경로 만들기     */
var newPath = pathUtil.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
console.log('path.join : ', newPath);

var newPath2 = pathUtil.format({
    root : '/',
    dir : '/home/user/dir',
    base : 'file.txt.',
    ext : '.txt',
    name : 'file'
});

console.log('path.format : ', newPath2);