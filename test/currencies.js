const currencyConfig = require('../dist/currency.json');
const localeConfig = require('../dist/locale.json');

const krokus = require('../dist/js/krokus.js').default;

const assert = require('chai').assert;

describe('Currencies', function() {
  it('should format EUR for de_DE accordingly.', function(){
    assert.equal(currencyConfig.EUR.symbol, 'EUR');
    const format = {
      pattern: localeConfig.de_DE.currency_pattern,
      decimal_sep: localeConfig.de_DE.decimal_sep,
      group_sep: localeConfig.de_DE.group_sep,
      symbol: currencyConfig.EUR.symbol,
    };
    assert.equal(krokus.formatCurrency(10000, format), '10.000,00 EUR');
  });

  it('should set check the correct USD symbol', function() {
      assert.equal(currencyConfig.USD.symbol, 'USD');
  });
});
