var should = require('should');
// 검증

//  1. 정수 검증
var intVal = 5;
intVal.should.equal(5);
intVal.should.be.exactly(5);
intVal.should.equal(4); // Fail

//  2. 문자열 검증
var strVal = 'Hello';
strVal.should.equal('Hello');
strVal.should.startWith('H').and.endWith('o');

//  3. Object 검증
var obj = {
    value : 10
};
obj.should.eql({value : 10});
obj.should.equal({value:10}); // Assert Fail

//  4. 배열 검증
var array = [1, 2, 3, 4];
array.should.have.property(3);
array.should.have.property(4); // Assert Fail