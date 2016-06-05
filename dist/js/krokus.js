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

  var numberOfDecimals = (0, _krokusFormat.getNumberOfDecimals)(pattern);
  var roundedNumber = (0, _krokusMath.round)(number, numberOfDecimals);
  var groupSize = (0, _krokusFormat.getSizeOfGroup)(pattern);

  var integerPart = (0, _krokusMath.trunc)(roundedNumber);
  var decimalPart = roundedNumber - integerPart;

  var numberAsString = String(integerPart);

  var length = numberAsString.length;
  var i = length - groupSize;
  var numberOfGroups = 0;
  while (i > 0) {
    numberAsString = numberAsString.substr(0, i) + formatPattern.group_sep + numberAsString.substr(i);
    i = i - groupSize;
  }

  if (numberOfDecimals > 0) {
    var formattedDecimalPart = '';
    if (decimalPart === 0) {
      formattedDecimalPart = new Array(numberOfDecimals + 1).join('0');
    } else {
      formattedDecimalPart = String(decimalPart).substr(2).substr(0, numberOfDecimals);
    }
    numberAsString = numberAsString + formatPattern.decimal_sep + formattedDecimalPart;
  }

  return numberAsString;
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