const round = require('../dist/js/krokusMath.js').round;
const trunc = require('../dist/js/krokusMath.js').trunc;
const countNumberOfDecimals = require('../dist/js/krokusMath.js').countNumberOfDecimals;
const getDecimalPart = require('../dist/js/krokusMath.js').getDecimalPart;

const assert = require('chai').assert;

describe('Krokus Math', function() {
  describe('round', function() {
    it('should round the numbers', function () {
      assert.equal(round(23.44, 2), 23.44);
      assert.equal(round(23.442, 2), 23.44);
      assert.equal(round(23.446, 2), 23.45);
      assert.equal(round(23.44, 1), 23.4);
      assert.equal(round(23.44, 4), 23.44);
      assert.equal(round(432.5579, 3), 432.558);
    });
  });

  describe('trunc', function() {
    it('should trunc the given numbers', function () {
      assert.equal(trunc(23.44), 23);
      assert.equal(trunc(23), 23);
    });
  });

  describe('countNumberOfDecimals', function() {
    it('should return the number of decimals', function() {
        assert.equal(countNumberOfDecimals(23.44), 2);
        assert.equal(countNumberOfDecimals(23), 0);
        assert.equal(countNumberOfDecimals(23.76262), 5);
    });
  });
  
  describe('getDecimalPart', function() {
    it('should return the number of decimals', function() {
        assert.equal(getDecimalPart(23.44), 0.44);
        assert.equal(getDecimalPart(23), 0);
        assert.equal(getDecimalPart(23.76262), 0.76262);
    });
  });
});
