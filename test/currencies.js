const currencyConfig = require('../dist/currency.json');
const localeConfig = require('../dist/locale.json');

const krokus = require('../dist/js/krokus.js').default;

module.exports = {
  'test EUR': function(beforeExit, assert) {
    assert.equal(currencyConfig.EUR.symbol, 'EUR');
    const format = {
      pattern: localeConfig.de_DE.currency_pattern,
      decimal_sep: localeConfig.de_DE.decimal_sep,
      group_sep: localeConfig.de_DE.group_sep,
      symbol: currencyConfig.EUR.symbol,
    };
    assert.equal(krokus.formatCurrency(10000, format), '10.000,00 EUR');
  },
  'test USD': function(beforeExit, assert) {
    assert.equal(currencyConfig.USD.symbol, 'USD');
  }
};
