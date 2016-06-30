const localeConfig = require('../dist/locale.json');
const krokus = require('../dist/js/krokus.js').default;
const assert = require('chai').assert;

describe('Locales', function() {
  describe('FR', function() {
    it('should have the expected patterns for fr', function() {
      assert.equal(localeConfig.fr.group_sep, ' ');
      assert.equal(localeConfig.fr.decimal_sep, ',');
      assert.equal(localeConfig.fr.number_pattern, '#,##0.###');
      assert.equal(localeConfig.fr.currency_pattern, '#,##0.00 ¤');
    });
    it('should have the expected patterns for fr_CA', function() {
      assert.equal(localeConfig.fr_CA.group_sep, ' ');
      assert.equal(localeConfig.fr_CA.decimal_sep, ',');
      assert.equal(localeConfig.fr_CA.number_pattern, '#,##0.###');
      assert.equal(localeConfig.fr_CA.currency_pattern, '#,##0.00 ¤');
    });
    it('should have the expected patterns for fr_CH', function() {
      assert.equal(localeConfig.fr_CH.group_sep, ' ');
      assert.equal(localeConfig.fr_CH.decimal_sep, '.');
      assert.equal(localeConfig.fr_CH.number_pattern, '#,##0.###');
      assert.equal(localeConfig.fr_CH.currency_pattern, '¤ #,##0.00;¤-#,##0.00');
    });
  });
  describe('EN', function() {
    it('should have the expected patterns for en', function() {
      assert.equal(localeConfig.en.group_sep, ',');
      assert.equal(localeConfig.en.decimal_sep, '.');
      assert.equal(localeConfig.en.number_pattern, '#,##0.###');
      assert.equal(localeConfig.en.currency_pattern, '¤#,##0.00');
    });
    it('should have the expected patterns for en_IE', function() {
      assert.equal(localeConfig.en_IE.group_sep, ',');
      assert.equal(localeConfig.en_IE.decimal_sep, '.');
      assert.equal(localeConfig.en_IE.number_pattern, '#,##0.###');
      assert.equal(localeConfig.en_IE.currency_pattern, '¤#,##0.00');
    });
    it('should have the expected patterns for en_IN', function() {
      assert.equal(localeConfig.en_IN.group_sep, ',');
      assert.equal(localeConfig.en_IN.decimal_sep, '.');
      assert.equal(localeConfig.en_IN.number_pattern, '#,##,##0.###');
      assert.equal(localeConfig.en_IN.currency_pattern, '¤ #,##,##0.00');
    });
  });
  describe('AR', function() {
    it('should have the expected patterns for ar', function() {
      assert.equal(localeConfig.ar.group_sep, ',');
      assert.equal(localeConfig.ar.decimal_sep, '.');
      assert.equal(localeConfig.ar.number_pattern, '#,##0.###');
      assert.equal(localeConfig.ar.currency_pattern, '¤ #,##0.00');
    });
    it('should have the expected patterns for ar_AE', function() {
      assert.equal(localeConfig.ar_AE.group_sep, ',');
      assert.equal(localeConfig.ar_AE.decimal_sep, '.');
      assert.equal(localeConfig.ar_AE.number_pattern, '#,##0.###');
      assert.equal(localeConfig.ar_AE.currency_pattern, '¤ #,##0.00');
    });
  });
});
