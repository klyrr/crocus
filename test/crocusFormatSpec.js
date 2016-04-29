const getNumberOfDecimals = require('../dist/js/crocusFormat.js').getNumberOfDecimals;
const getSizeOfGroup = require('../dist/js/crocusFormat.js').getSizeOfGroup;

module.exports = {
  'test crocus format number': function(beforeExit, assert) {
    assert.equal(getNumberOfDecimals('#,##0.00 ¤'), 2);
    assert.equal(getNumberOfDecimals('#,##0.0000 ¤'), 4);
    assert.equal(getNumberOfDecimals(' ¤ #,##0.00'), 2);
    assert.equal(getNumberOfDecimals(' ¤ #,##0.000'), 3);
    assert.equal(getNumberOfDecimals('#,##0.00'), 2);
    assert.equal(getNumberOfDecimals('#,##0'), 0);
  },
  'test crocus format group separators': function(beforeExit, assert) {
    assert.equal(getSizeOfGroup('#,##0.00'), 3);
    assert.equal(getSizeOfGroup('#,##0'), 3);
  }
};
