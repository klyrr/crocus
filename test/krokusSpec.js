const krokus = require('../index.js');
const assert = require('chai').assert;

describe('Krokus', function() {
  describe('Formatter', function() {

    it('should format the numbers', function () {
      const formatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(krokus.formatNumber(10000, formatPattern), '10.000,00');
      assert.equal(krokus.formatNumber(200000000, formatPattern), '200.000.000,00');
      assert.equal(krokus.formatNumber(432.55, formatPattern), '432,55');
      assert.equal(krokus.formatNumber(432.5, formatPattern), '432,50');
    });

    it('should format the numbers without trailing numbers', function () {
      const formatPattern = {
        pattern: '#,##0.###',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(krokus.formatNumber(10000, formatPattern), '10.000');
      assert.equal(krokus.formatNumber(200000000, formatPattern), '200.000.000');
      assert.equal(krokus.formatNumber(432.55, formatPattern), '432,55');
      assert.equal(krokus.formatNumber(432.5577, formatPattern), '432,558');
    });

    it('should not format strings only numbers', function() {
      const formatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(krokus.formatNumber('10000', formatPattern), '10000');
      assert.equal(krokus.formatCurrency('10000', formatPattern), '10000');
    });

    it('should format the currencies', function () {
      const formatCurrencyPattern = krokus.locales.de_DE;
      formatCurrencyPattern.pattern = formatCurrencyPattern.currency_pattern;
      formatCurrencyPattern.symbol = '€';

      assert.equal(krokus.formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
    });

    it('should format the currencies for USD', function () {
      const formatCurrencyPatternForUSD = {
        pattern: '¤#,##0.00',
        decimal_sep: '.',
        group_sep: ',',
        symbol: '$',
      };

      assert.equal(krokus.formatCurrency(10000000, formatCurrencyPatternForUSD), '$10,000,000.00');
    });

    it('should format the currency for negative and positive numbers', function () {
      const formatCurrencyPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      assert.equal(krokus.formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
      assert.equal(krokus.formatCurrency(-10000, formatCurrencyPattern), '-10.000,00 €');
    });

    it('should format the format not currency', function () {
      const wrongPattern = '#,##0.00 ¤ l';
      const wrongFormatCurrencyPattern = {
        pattern: wrongPattern,
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      try {
        const notDefined = krokus.formatCurrency(10000, wrongFormatCurrencyPattern);
        assert.equal(notDefined, 'This must not happen');
      } catch(e) {
        assert.equal(e, 'Given format is wrong: ' + wrongPattern);
      }
    });
  });

  describe('Parser', function() {
    it('should parse the numbers', function () {
      const formatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(krokus.parseNumber('10.000,00', formatPattern), 10000);
      assert.equal(krokus.parseNumber('200.000.000,00', formatPattern), 200000000);
      assert.equal(krokus.parseNumber('432,55', formatPattern), 432.55);
      assert.equal(krokus.parseNumber('432,50', formatPattern), 432.5);
      assert.equal(krokus.parseNumber('10.000', formatPattern), 10000);
      assert.equal(krokus.parseNumber('200.000.000', formatPattern), 200000000);
      assert.equal(krokus.parseNumber('432,558', formatPattern), 432.558);

      assert.equal(krokus.parseNumber('-432,55', formatPattern), -432.55);
    });

    it('should parse the currencies', function () {
      const formatPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      assert.equal(krokus.parseCurrency('10.000,00 €', formatPattern), 10000);
      assert.equal(krokus.parseCurrency('200.000.000,00 €', formatPattern), 200000000);
      assert.equal(krokus.parseCurrency('432,55 €', formatPattern), 432.55);
      assert.equal(krokus.parseCurrency('432,50 €', formatPattern), 432.5);
      assert.equal(krokus.parseCurrency('10.000 €', formatPattern), 10000);
      assert.equal(krokus.parseCurrency('200.000.000 €', formatPattern), 200000000);
      assert.equal(krokus.parseCurrency('€432,558', formatPattern), 432.558);

      assert.equal(krokus.parseCurrency('-432,55 €', formatPattern), -432.55);
      assert.equal(krokus.parseCurrency('€ -432,55', formatPattern), -432.55);
    });

    it('should parse swiss currencies', function() {
      const formatPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: ' ',
        symbol: 'CHF',
      };

      try {
        const notDefined = krokus.parseCurrency('10.000,00 CHF', formatPattern);
        assert.equal(notDefined, 'This must not happen');
      } catch(e) {
        assert.equal(e, 'Given formatted number is wrong: 10.000,00');
      }

      assert.equal(krokus.parseCurrency('10 000,00 CHF', formatPattern), 10000);
    })
  });
});
