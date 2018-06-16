/* global describe it */
const {
  formatCurrency,
  formatNumber,
  locales,
  parseCurrency,
  parseNumber,
} = require('../index.js');

const assert = require('chai').assert;

describe('krokus', () => {
  describe('formatter', () => {
    it('should format the numbers', () => {
      const formatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(formatNumber(10000, formatPattern), '10.000,00');
      assert.equal(formatNumber(200000000, formatPattern), '200.000.000,00');
      assert.equal(formatNumber(432.55, formatPattern), '432,55');
      assert.equal(formatNumber(432.5, formatPattern), '432,50');
    });

    it('should format the numbers without trailing numbers', () => {
      const formatPattern = {
        pattern: '#,##0.###',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(formatNumber(10000, formatPattern), '10.000');
      assert.equal(formatNumber(200000000, formatPattern), '200.000.000');
      assert.equal(formatNumber(432.55, formatPattern), '432,55');
      assert.equal(formatNumber(432.5577, formatPattern), '432,558');
    });

    it('should not format strings only numbers', () => {
      const formatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(formatNumber('10000', formatPattern), '10000');
      assert.equal(formatCurrency('10000', formatPattern), '10000');
    });

    it('should format the currencies', () => {
      const formatCurrencyPattern = locales.de_DE;
      formatCurrencyPattern.pattern = formatCurrencyPattern.currency_pattern;
      formatCurrencyPattern.symbol = '€';

      assert.equal(formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
    });

    it('should format the currencies for USD', () => {
      const formatCurrencyPatternForUSD = {
        pattern: '¤#,##0.00',
        decimal_sep: '.',
        group_sep: ',',
        symbol: '$',
      };

      assert.equal(
        formatCurrency(10000000, formatCurrencyPatternForUSD),
        '$10,000,000.00'
      );
    });

    it('should format the currency for negative and positive numbers', () => {
      const formatCurrencyPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      assert.equal(formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
      assert.equal(
        formatCurrency(-10000, formatCurrencyPattern),
        '-10.000,00 €'
      );
    });

    it('should format the format not currency', () => {
      const wrongPattern = '#,##0.00 ¤ l';
      const wrongFormatCurrencyPattern = {
        pattern: wrongPattern,
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      try {
        const notDefined = formatCurrency(10000, wrongFormatCurrencyPattern);
        assert.equal(notDefined, 'This must not happen');
      } catch (e) {
        assert.equal(e, 'Given format is wrong: ' + wrongPattern);
      }
    });
  });

  describe('parser', () => {
    it('should parse the numbers', () => {
      const formatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(parseNumber('10.000,00', formatPattern), 10000);
      assert.equal(parseNumber('200.000.000,00', formatPattern), 200000000);
      assert.equal(parseNumber('432,55', formatPattern), 432.55);
      assert.equal(parseNumber('432,50', formatPattern), 432.5);
      assert.equal(parseNumber('10.000', formatPattern), 10000);
      assert.equal(parseNumber('200.000.000', formatPattern), 200000000);
      assert.equal(parseNumber('432,558', formatPattern), 432.558);

      assert.equal(parseNumber('-432,55', formatPattern), -432.55);
    });

    it('should parse the currencies', () => {
      const formatPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      assert.equal(parseCurrency('10.000,00 €', formatPattern), 10000);
      assert.equal(parseCurrency('200.000.000,00 €', formatPattern), 200000000);
      assert.equal(parseCurrency('432,55 €', formatPattern), 432.55);
      assert.equal(parseCurrency('432,50 €', formatPattern), 432.5);
      assert.equal(parseCurrency('10.000 €', formatPattern), 10000);
      assert.equal(parseCurrency('200.000.000 €', formatPattern), 200000000);
      assert.equal(parseCurrency('€432,558', formatPattern), 432.558);

      assert.equal(parseCurrency('-432,55 €', formatPattern), -432.55);
      assert.equal(parseCurrency('€ -432,55', formatPattern), -432.55);
    });

    it('should parse swiss currencies', () => {
      const formatPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: ' ',
        symbol: 'CHF',
      };

      try {
        const notDefined = parseCurrency('10.000,00 CHF', formatPattern);
        assert.equal(notDefined, 'This must not happen');
      } catch (e) {
        assert.equal(e, 'Given formatted number is wrong: 10.000,00');
      }

      assert.equal(parseCurrency('10 000,00 CHF', formatPattern), 10000);
    });
  });
});
