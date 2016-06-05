const currencyConfig = require('../dist/currency.json');
const localeConfig = require('../dist/locale.json');

const krokus = require('../dist/js/krokus.js').default;

const assert = require('chai').assert;

describe('Currencies', function() {
  it('should format EUR for de_DE accordingly.', function(){
    assert.equal(currencyConfig.EUR.symbol, 'EUR');
    const locale_de_DE = localeConfig.de;
    const currency_EUR = currencyConfig.EUR;
    const format = {
      pattern: locale_de_DE.currency_pattern,
      decimal_sep: locale_de_DE.decimal_sep,
      group_sep: locale_de_DE.group_sep,
      symbol: currency_EUR.symbol,
    };
    assert.equal(krokus.formatCurrency(10000, format), '10.000,00 EUR');
  });

  it('should set check the correct USD symbol', function() {
      assert.equal(currencyConfig.USD.symbol, 'USD');
  });
});
