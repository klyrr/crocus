'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _krokusMath = require('./krokusMath');

var _krokusFormat = require('./krokusFormat');

/**
 * formatPattern = { pattern, decimal_sep, group_sep }
 * pattern: #,##0.00
 */
var formatNumber = function formatNumber(number, formatPattern) {
  var pattern = formatPattern.pattern;
  if (!(0, _krokusFormat.isValidFormatPattern)(pattern)) {
    throw 'Given format is wrong';
  }

  var numberOfMaximumDecimals = (0, _krokusFormat.getNumberOfDecimals)(pattern);
  var numberOfMinimumDecimals = (0, _krokusFormat.getNumberOfRequiredDecimals)(pattern);

  var roundedNumber = (0, _krokusMath.round)(number, numberOfMaximumDecimals);
  var integerPart = (0, _krokusMath.trunc)(number);
  var decimalPart = (0, _krokusMath.getDecimalPart)(roundedNumber);

  var integerPartAsString = (0, _krokusFormat.formatIntegerPart)(integerPart, pattern, formatPattern.group_sep);

  if (decimalPart === 0 && numberOfMinimumDecimals === 0) {
    return integerPartAsString;
  }

  var decimalPartAsString = (0, _krokusFormat.formatDecimalPart)(number, decimalPart, numberOfMaximumDecimals, numberOfMinimumDecimals, formatPattern.decimal_sep);

  return integerPartAsString + decimalPartAsString;
};

/**
 * formatPattern = { pattern, decimal_sep, group_sep, symbol }
 * pattern: #,##0.00
 */
var formatCurrency = function formatCurrency(number, formatPattern) {
  if (!(0, _krokusFormat.isValidFormatPattern)(formatPattern.pattern)) {
    throw 'Given format is wrong';
  }

  var formattedNumber = formatNumber(number, formatPattern);
  var formattedCurrency = (0, _krokusFormat.replaceFormatWithNumber)(formatPattern.pattern, formattedNumber);
  return formattedCurrency.replace(_krokusFormat.CURRENCY_SYMBOL, formatPattern.symbol);
};

var krokus = {
  formatNumber: formatNumber,
  formatCurrency: formatCurrency
};

exports.default = krokus;