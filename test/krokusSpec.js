const krokus = require('../dist/js/krokus.js').default;
const assert = require('chai').assert;

describe('Krokus', function() {
    it('should format the numbers', function () {
      const formatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(krokus.formatNumber(10000, formatPattern), '10.000,00');
      assert.equal(krokus.formatNumber(200000000, formatPattern), '200.000.000,00');
      assert.equal(krokus.formatNumber(432.55, formatPattern), '432,55');
    });

    it('should format the currencies', function () {
      const formatCurrencyPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      assert.equal(krokus.formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
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
      const wrongFormatCurrencyPattern = {
        pattern: '#,##0.00 ¤ l',
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      try {
        const notDefined = krokus.formatCurrency(10000, wrongFormatCurrencyPattern);
        assert.equal(notDefined, 'This must not happen');
      } catch(e) {
        assert.equal(e, 'Given format is wrong');
      }
    });
});
