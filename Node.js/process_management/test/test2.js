const assert = require('assert');
const should = require('should');

describe('Suite2', () => {
   it('Multiply',(done) =>{
      assert.equal((1*2), 2);
      done();
   });
   it('Devide', (done) => {
      assert.equal((6/3), 2);
      done();
   });  
});