var config = require('../dist/currency.json');

module.exports = {
  'test EUR': function(beforeExit, assert) {
    assert.equal(config.EUR.symbol, 'EUR');
  },
  'test USD': function(beforeExit, assert) {
    assert.equal(config.USD.symbol, 'USD');
  }
};
