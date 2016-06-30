const currencyConfig = require('../dist/currency.json');
const localeConfig = require('../dist/locale.json');

const krokus = require('../dist/js/krokus.js').default;

const assert = require('chai').assert;

describe('Currencies', function() {
  it('should format a price in EUR for de_DE as expected.', function() {
    const locale_de_DE = localeConfig.de;
    const currency_EUR = currencyConfig.EUR;
    const format = {
      pattern: locale_de_DE.currency_pattern,
      decimal_sep: locale_de_DE.decimal_sep,
      group_sep: locale_de_DE.group_sep,
      symbol: currency_EUR.symbol,
    };

    assert.equal(krokus.formatNumber(20000, format), '20.000,00');
    assert.equal(krokus.formatCurrency(20000, format), '20.000,00 €');
  });

  it('should have the expected USD symbol', function() {
      assert.equal(currencyConfig.USD.symbol, '$');
      assert.equal(currencyConfig.USD.wideSymbol, 'US$');
      assert.equal(currencyConfig.USD.code, 'USD');
  });

  it('should have the expected AED symbol', function() {
      assert.equal(currencyConfig.AED.symbol, 'AED');
      assert.equal(currencyConfig.AED.wideSymbol, 'AED');
      assert.equal(currencyConfig.AED.code, 'AED');
  });

  it('should have the expected EUR symbol', function() {
      assert.equal(currencyConfig.EUR.symbol, '€');
      assert.equal(currencyConfig.EUR.wideSymbol, '€');
      assert.equal(currencyConfig.EUR.code, 'EUR');
  });

  it('should have the expected INR symbol', function() {
      assert.equal(currencyConfig.INR.symbol, '₹');
      assert.equal(currencyConfig.INR.wideSymbol, '₹');
      assert.equal(currencyConfig.INR.code, 'INR');
  });
});
