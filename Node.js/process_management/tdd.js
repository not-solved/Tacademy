const assert = require('assert');
const Calculator = require('./calculator');

suite('Calculator', () => {
    var calculator;

    suiteSetup(() => {
        calculator = new Calculator();
        console.log('suite Setup');
    });

    suiteTeardown(function() {
        console.log('suiteTearDown');
    });
     
    setup(function() {
        console.log('setup');
    });
     
    teardown(function() {
        console.log('teardown');
    });
     
    test('Add', function() {
        var value = calculator.add(1, 2);
        assert.equal(value, 3, '1 + 2 = 3');
    });
     
    test('Minus', function() {
        var value = calculator.minus(1, 2);
        assert.equal(value, -1, '1 - 2 = -1');
    });
});