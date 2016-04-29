const crocus = require('../dist/js/crocus.js').default;

const formatPattern = {
  pattern: '#,##0.00',
  decimal_sep: ',',
  group_sep: '.',
}

const formatCurrencyPattern = {
  pattern: '#,##0.00 ¤',
  decimal_sep: ',',
  group_sep: '.',
  symbol: '€',
}

module.exports = {
  'test crocus format number': function(beforeExit, assert) {
    assert.equal(crocus.formatNumber('10000', formatPattern), '10.000,00');
    assert.equal(crocus.formatNumber('200000000', formatPattern), '200.000.000,00');
    assert.equal(crocus.formatNumber('432.55', formatPattern), '432,55');
  },
  'test crocus format currency': function(beforeExit, assert) {
    assert.equal(crocus.formatCurrency('10000', formatCurrencyPattern), '10.000,00 €')
  }
};
