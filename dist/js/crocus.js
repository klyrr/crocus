'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crocusMath = require('./crocusMath');

var _crocusFormat = require('./crocusFormat');

/**
 * formatPattern = { pattern, decimal_sep, group_sep, symbol }
 * pattern: #,##0.00
 */
var formatNumber = function formatNumber(number, formatPattern) {
  var numberOfDecimals = (0, _crocusFormat.getNumberOfDecimals)(formatPattern.pattern);
  var roundedNumber = (0, _crocusMath.round)(number, numberOfDecimals);
  var groupSize = (0, _crocusFormat.getSizeOfGroup)(formatPattern.pattern);

  var integerPart = (0, _crocusMath.trunc)(roundedNumber);
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
 * formatPattern = { pattern, decimal_sep, group_sep }
 * pattern: #,##0.00
 */
var formatCurrency = function formatCurrency(number, formatPattern) {
  return formatNumber(number, formatPattern) + ' €';
};

var crocus = {
  formatNumber: formatNumber,
  formatCurrency: formatCurrency
};

exports.default = crocus;