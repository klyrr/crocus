const crocus = require('../dist/js/crocus.js').default;

module.exports = {
  'test crocus format number': function(beforeExit, assert) {
    const formatPattern = {
      pattern: '#,##0.00',
      decimal_sep: ',',
      group_sep: '.',
    };

    assert.equal(crocus.formatNumber('10000', formatPattern), '10.000,00');
    assert.equal(crocus.formatNumber('200000000', formatPattern), '200.000.000,00');
    assert.equal(crocus.formatNumber('432.55', formatPattern), '432,55');
  },
  'test crocus format currency': function(beforeExit, assert) {
    const formatCurrencyPattern = {
      pattern: '#,##0.00 ¤',
      decimal_sep: ',',
      group_sep: '.',
      symbol: '€',
    };

    assert.equal(crocus.formatCurrency('10000', formatCurrencyPattern), '10.000,00 €');
  },
  'test crocus format currency for USD': function(beforeExit, assert) {
    const formatCurrencyPatternForUSD = {
      pattern: '¤#,##0.00',
      decimal_sep: '.',
      group_sep: ',',
      symbol: '$',
    };

    assert.equal(crocus.formatCurrency('10000000', formatCurrencyPatternForUSD), '$10,000,000.00');
  },
  'test crocus format not currency': function(beforeExit, assert) {
    const wrongFormatCurrencyPattern = {
      pattern: '#,##0.00 ¤ l',
      decimal_sep: ',',
      group_sep: '.',
      symbol: '€',
    };

    try {
      const notDefined = crocus.formatCurrency('10000', wrongFormatCurrencyPattern);
      assert.equal(notDefined, 'This must not happen');
    } catch(e) {
      assert.equal(e, 'Given format is wrong');
    }
  }
};
