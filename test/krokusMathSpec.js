const round = require('../dist/js/krokusMath.js').round;
const trunc = require('../dist/js/krokusMath.js').trunc;

const assert = require('chai').assert;

describe('Krokus Math', function() {
  describe('round', function() {
    it('should round the numbers', function () {
      assert.equal(round(23.44, 2), 23.44);
      assert.equal(round(23.442, 2), 23.44);
      assert.equal(round(23.446, 2), 23.45);
      assert.equal(round(23.44, 1), 23.4);
      assert.equal(round(23.44, 4), 23.44);
    });
  });

  describe('trunc', function() {
    it('should trunc the given numbers', function () {
      assert.equal(trunc(23.44), 23);
      assert.equal(trunc(23), 23);
    });
  });
});
