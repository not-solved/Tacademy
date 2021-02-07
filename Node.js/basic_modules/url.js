//  url
var url = require('url');

var urlStr = 'http://idols.com/hot/q?group=EXID&name=하니&since=';
var parsed = url.parse(urlStr, true);

console.log(parsed);
console.log('protocol : ', parsed.protocol);    // 현재 프로토콜은 http
console.log('host : ', parsed.host);            // idols.com이 호스트 부분
console.log('query : ', parsed.query);          // q? 이하가 url의 쿼리부분