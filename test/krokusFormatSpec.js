/* global describe it */

const {
  checkFormattedNumber,
  formatDecimalPart,
  formatIntegerPart,
  getNumberOfDecimals,
  getNumberOfRequiredDecimals,
  getSizeOfGroup,
  isValidFormatPattern,
  replaceFormatWithNumber,
} = require('../dist/js/krokusFormat.js');

const assert = require('chai').assert;

describe('Krokus Format', () => {
  describe('getNumberOfDecimals', () => {
    it('should return the number of decimals from the format', () => {
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
    it('should return the number of decimals with formats that use non-breaking spaces', () => {
      assert.equal(getNumberOfDecimals('#,##0.00 ¤'), 2);
    });
  });
  describe('getNumberOfRequiredDecimals', () => {
    it('should return the numbers of required decimals', () => {
      assert.equal(getNumberOfRequiredDecimals('#,##0.00'), 2);
      assert.equal(getNumberOfRequiredDecimals('#,##0.00#'), 2);
      assert.equal(getNumberOfRequiredDecimals('#,##0'), 0);
      assert.equal(getNumberOfRequiredDecimals('#,##0.###'), 0);
    });
  });
  describe('getSizeOfGroup', () => {
    it('should return the size of the group', () => {
      assert.equal(getSizeOfGroup('#,##0.00'), 3);
      assert.equal(getSizeOfGroup('#,##0'), 3);
      assert.equal(getSizeOfGroup('¤ #,##0.00;¤ -#,##0.00'), 3);
      //    assert.equal(getSizeOfGroup('¤ #,##,##0.00'), 3);
    });
  });
  describe('isValidFormatPattern', () => {
    it('should return the number of decimals from the format', () => {
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
  describe('replaceFormatWithNumber', () => {
    it('should replace the number in the given format', () => {
      assert.equal(replaceFormatWithNumber('#,##0.00', '10.000'), '10.000');
      assert.equal(
        replaceFormatWithNumber('#,##0.0000 ¤', '10.000'),
        '10.000 ¤'
      );
    });
  });
  describe('formatIntegerPart', () => {
    it('should replace the number in the given format', () => {
      assert.equal(formatIntegerPart(120000, '#,##0.00', 'x'), '120x000');
      assert.equal(formatIntegerPart(0, '#,##0.0000 ¤', 'x'), '0');
    });
  });
  describe('formatDecimalPart', () => {
    it('should replace the number in the given format', () => {
      // number, decimalPart, numberOfMaximumDecimals, numberOfMinimumDecimals, decimalSeparator
      assert.equal(formatDecimalPart(12000.33, 0.33, 2, 2, ','), ',33');
      assert.equal(formatDecimalPart(12000.353, 0.35, 2, 2, ','), ',35');
      assert.equal(formatDecimalPart(12000.35, 0.35, 3, 3, ','), ',350');
      assert.equal(formatDecimalPart(12000, 0, 2, 0, ','), '');
    });
  });

  describe('checkFormattedNumber', () => {
    it('should check the given number', () => {
      assert.equal(checkFormattedNumber('10.000,44', '.', ','), true);
      assert.equal(checkFormattedNumber('10 000,44', ',', ' '), true);
      assert.equal(checkFormattedNumber('10,000.44', '.', ','), true);
      assert.equal(checkFormattedNumber('10.000', '.', ','), true);
      assert.equal(checkFormattedNumber('-10.000', '.', ','), true);
      assert.equal(checkFormattedNumber('0', '.', ','), true);

      assert.equal(checkFormattedNumber('10 000,44', ',', '.'), false);
      assert.equal(checkFormattedNumber('s,33.8', '.', ','), false);
      assert.equal(checkFormattedNumber('#,33.8', '.', ','), false);
      assert.equal(checkFormattedNumber('hello', '.', ','), false);
      assert.equal(checkFormattedNumber(42, '.', ','), false);
    });
  });
});
