const getNumberOfDecimals = require('../dist/js/krokusFormat.js').getNumberOfDecimals;
const getSizeOfGroup = require('../dist/js/krokusFormat.js').getSizeOfGroup;
const isValidFormatPattern = require('../dist/js/krokusFormat.js').isValidFormatPattern;
const replaceFormatWithNumber = require('../dist/js/krokusFormat.js').replaceFormatWithNumber;

module.exports = {
  'test krokus format number': function(beforeExit, assert) {
//    assert.equal(getNumberOfDecimals('¤ #,##0.00;¤ -#,##0.00'), 2);
    assert.equal(getNumberOfDecimals('¤ #,##,##0.00'), 2);
    assert.equal(getNumberOfDecimals('#,##0.00 ¤'), 2);
    assert.equal(getNumberOfDecimals('#,##0.0000 ¤'), 4);
    assert.equal(getNumberOfDecimals(' ¤ #,##0.00'), 2);
    assert.equal(getNumberOfDecimals(' ¤ #,##0.000'), 3);
    assert.equal(getNumberOfDecimals('#,##0.00'), 2);
    assert.equal(getNumberOfDecimals('#,##0'), 0);
  },
  'test krokus format group separators': function(beforeExit, assert) {
    assert.equal(getSizeOfGroup('#,##0.00'), 3);
    assert.equal(getSizeOfGroup('#,##0'), 3);
    assert.equal(getSizeOfGroup('¤ #,##0.00;¤ -#,##0.00'), 3);
//    assert.equal(getSizeOfGroup('¤ #,##,##0.00'), 3);
  },
  'test krokus format assert valid format': function(beforeExit, assert) {
    assert.equal(isValidFormatPattern('#,##0.00 ¤'), true);
    assert.equal(isValidFormatPattern('#,##0.00'), true);
    assert.equal(isValidFormatPattern('#,##0'), true);
    assert.equal(isValidFormatPattern('¤ #,##0.00;¤ -#,##0.00'), true);
    assert.equal(isValidFormatPattern('¤ #,##,##0.00'), true);
    assert.equal(isValidFormatPattern(' ¤ #,##,##0.00'), true);

    assert.equal(isValidFormatPattern('f ¤ #,##,##0.00'), false);
    assert.equal(isValidFormatPattern('#.##,##0'), false);
    assert.equal(isValidFormatPattern('#.,##0dds'), false);
    assert.equal(isValidFormatPattern('#,33.8'), false);
  },
  'test krokus replace format with number': function(beforeExit, assert) {
    assert.equal(replaceFormatWithNumber('#,##0.00', '10.000'), '10.000');
    assert.equal(replaceFormatWithNumber('#,##0.0000 ¤', '10.000'), '10.000 ¤');
  },
};
