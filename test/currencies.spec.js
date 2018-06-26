/* global describe, it */
import { AED, EUR, INR, JPY, USD } from '../src/generated/currencies.json';
import { formatCurrency, formatNumber } from '../src/js/krokus';
import { assert } from 'chai';
import { de } from '../src/generated/locales.json';

describe('Currencies', () => {
  it('should format a price in EUR for de_DE as expected.', () => {
    const locale_de_DE = de;
    const currency_EUR = EUR;
    const format = {
      pattern: locale_de_DE.currency_pattern,
      decimal_sep: locale_de_DE.decimal_sep,
      group_sep: locale_de_DE.group_sep,
      symbol: currency_EUR.symbol,
    };

    assert.equal(formatNumber(20000, format), '20.000,00');
    assert.equal(formatCurrency(20000, format), '20.000,00 €');
  });

  it('should have the expected USD symbol', () => {
    assert.equal(USD.symbol, '$');
    assert.equal(USD.wideSymbol, 'US$');
    assert.equal(USD.code, 'USD');
  });

  it('should have the expected AED symbol', () => {
    assert.equal(AED.symbol, 'AED');
    assert.equal(AED.wideSymbol, 'AED');
    assert.equal(AED.code, 'AED');
  });

  it('should have the expected EUR symbol', () => {
    assert.equal(EUR.symbol, '€');
    assert.equal(EUR.wideSymbol, '€');
    assert.equal(EUR.code, 'EUR');
  });

  it('should have the expected INR symbol', () => {
    assert.equal(INR.symbol, '₹');
    assert.equal(INR.wideSymbol, '₹');
    assert.equal(INR.code, 'INR');
  });

  it('should have the expected JPY symbol', () => {
    assert.equal(JPY.symbol, '¥');
    assert.equal(JPY.wideSymbol, 'JP¥');
    assert.equal(JPY.code, 'JPY');
  });
});
