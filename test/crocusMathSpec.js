const round = require('../dist/js/crocusMath.js').round;

module.exports = {
  'test round': function(beforeExit, assert) {
    assert.equal(round(23.44, 2), 23.44);
    assert.equal(round(23.442, 2), 23.44);
    assert.equal(round(23.446, 2), 23.45);
    assert.equal(round(23.44, 1), 23.4);
    assert.equal(round(23.44, 4), 23.44);
  }
};
