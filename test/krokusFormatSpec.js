const getNumberOfDecimals = require('../dist/js/krokusFormat.js').getNumberOfDecimals;
const getSizeOfGroup = require('../dist/js/krokusFormat.js').getSizeOfGroup;
const isValidFormatPattern = require('../dist/js/krokusFormat.js').isValidFormatPattern;
const replaceFormatWithNumber = require('../dist/js/krokusFormat.js').replaceFormatWithNumber;

const assert = require('chai').assert;

describe('Krokus Format', function() {
  describe('getNumberOfDecimals', function() {
    it('should return the number of decimals from the format', function () {
  //    assert.equal(getNumberOfDecimals('¤ #,##0.00;¤ -#,##0.00'), 2);
      assert.equal(getNumberOfDecimals('¤ #,##,##0.00'), 2);
      assert.equal(getNumberOfDecimals('#,##0.00 ¤'), 2);
      assert.equal(getNumberOfDecimals('#,##0.0000 ¤'), 4);
      assert.equal(getNumberOfDecimals(' ¤ #,##0.00'), 2);
      assert.equal(getNumberOfDecimals(' ¤ #,##0.000'), 3);
      assert.equal(getNumberOfDecimals('#,##0.00'), 2);
      assert.equal(getNumberOfDecimals('#,##0'), 0);
      assert.equal(getNumberOfDecimals('#,##0.###'), 3);
    });
    it('should return the number of decimals with formats that use non-breaking spaces', function() {
      assert.equal(getNumberOfDecimals('#,##0.00 ¤'), 2)
    });
  });
  describe('getSizeOfGroup', function() {
    it('should return the size of the group', function () {
      assert.equal(getSizeOfGroup('#,##0.00'), 3);
      assert.equal(getSizeOfGroup('#,##0'), 3);
      assert.equal(getSizeOfGroup('¤ #,##0.00;¤ -#,##0.00'), 3);
  //    assert.equal(getSizeOfGroup('¤ #,##,##0.00'), 3);
    });
  });
  describe('isValidFormatPattern', function() {
    it('should return the number of decimals from the format', function () {
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
    });
  });
  describe('replaceFormatWithNumber', function() {
    it('should replace the number in the given format', function () {
      assert.equal(replaceFormatWithNumber('#,##0.00', '10.000'), '10.000');
      assert.equal(replaceFormatWithNumber('#,##0.0000 ¤', '10.000'), '10.000 ¤');
    });
  });
});
