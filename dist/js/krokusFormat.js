'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSizeOfGroup = exports.getNumberOfRequiredDecimals = exports.getNumberOfDecimals = exports.replaceFormatWithNumber = exports.formatDecimalPart = exports.formatIntegerPart = exports.isValidFormatPattern = exports.CURRENCY_SYMBOL = undefined;

var _krokusMath = require('./krokusMath');

var DECIMAL_SEPARTOR = '.';
var GROUP_SEPARTOR = ',';
var CURRENCY_SYMBOL = exports.CURRENCY_SYMBOL = '¤';
var ALLOWED_NUMBER_FORMAT_CHARS = ',#0;';
var ALLOWED_GENERAL_FORMAT_CHARS = ALLOWED_NUMBER_FORMAT_CHARS + '- ' + CURRENCY_SYMBOL;

var isValidFormatPattern = exports.isValidFormatPattern = function isValidFormatPattern(format) {
  format = format.trim();
  var posGroupSeparator = format.indexOf(GROUP_SEPARTOR);
  var posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator >= 0 && posDecimalSeparator < posGroupSeparator) {
    return false;
  }
  var posCurrencySymbol = format.indexOf(CURRENCY_SYMBOL);

  // currency must be first or last character of pattern or non-exiting
  if (posCurrencySymbol !== 0 && posCurrencySymbol !== -1 && posCurrencySymbol !== format.length - 1) {
    return false;
  }
  var formatToBeChecked = format;
  formatToBeChecked = formatToBeChecked.replace(/\./g, '').trim();
  formatToBeChecked = replaceChars(formatToBeChecked, ALLOWED_GENERAL_FORMAT_CHARS);
  return formatToBeChecked.length === 0 || formatToBeChecked === CURRENCY_SYMBOL;
};

var formatIntegerPart = exports.formatIntegerPart = function formatIntegerPart(integerPart, pattern, groupSeparator) {
  var integerPartAsString = String(integerPart);
  var groupSize = getSizeOfGroup(pattern);

  var length = integerPartAsString.length;
  var i = length - groupSize;
  var numberOfGroups = 0;

  while (i > 0) {
    integerPartAsString = integerPartAsString.substr(0, i) + groupSeparator + integerPartAsString.substr(i);
    i = i - groupSize;
  }

  return integerPartAsString;
};

var formatDecimalPart = exports.formatDecimalPart = function formatDecimalPart(number, decimalPart, numberOfMaximumDecimals, numberOfMinimumDecimals, decimalSeparator) {
  if (decimalPart === 0 && numberOfMinimumDecimals === 0) {
    return '';
  }
  if (decimalPart === 0) {
    return decimalSeparator + new Array(numberOfMinimumDecimals + 1).join('0');
  }

  if (numberOfMinimumDecimals > 0 || numberOfMaximumDecimals > 0) {
    var numberOfActualDecimals = (0, _krokusMath.countNumberOfDecimals)(number);
    // cut the '0.'
    var decimalPartString = String(decimalPart).substr(2);
    var formattedDecimalPart = addZerosIfNeeded(numberOfMinimumDecimals, Math.min(numberOfActualDecimals, numberOfMaximumDecimals), decimalPartString);

    return decimalSeparator + formattedDecimalPart;
  }
  return '';
};

var replaceChars = function replaceChars(pattern, charsToBeReplaced) {
  var replacement = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

  for (var i = 0; i < charsToBeReplaced.length; i++) {
    pattern = pattern.replace(new RegExp(charsToBeReplaced[i], 'g'), replacement).trim();
  }
  return pattern;
};

var addZerosIfNeeded = function addZerosIfNeeded(numberOfMinimumDecimals, numberOfActualDecimals, decimalPartString) {
  var zerosToAdd = numberOfMinimumDecimals - decimalPartString.length;
  if (zerosToAdd <= 0) {
    return decimalPartString.substr(0, numberOfActualDecimals);
  }
  return decimalPartString + new Array(zerosToAdd + 1).join('0');
};

var replaceFormatWithNumber = exports.replaceFormatWithNumber = function replaceFormatWithNumber(pattern, formattedNumber) {
  pattern = pattern.replace(/\./g, '@').trim();
  pattern = replaceChars(pattern, ALLOWED_NUMBER_FORMAT_CHARS, '@');
  pattern = pattern.replace('@', formattedNumber);
  return pattern.split('@').join('');
};

var getNumberOfDecimals = exports.getNumberOfDecimals = function getNumberOfDecimals(pattern) {
  var posDecimalSeparator = pattern.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator < 0) {
    return 0;
  }
  // if currency pattern cut the currency symbol
  var posSpace = pattern.indexOf(' ', posDecimalSeparator);

  // look also for non-breaking space
  var posNBSpace = pattern.indexOf(' ', posDecimalSeparator);

  if (posSpace >= 0) {
    pattern = pattern.substr(0, posSpace);
  } else if (posNBSpace >= 0) {
    pattern = pattern.substr(0, posNBSpace);
  }
  return pattern.length - posDecimalSeparator - 1;
};

var getNumberOfRequiredDecimals = exports.getNumberOfRequiredDecimals = function getNumberOfRequiredDecimals(pattern) {
  var numberOfDecimals = getNumberOfDecimals(pattern);
  if (numberOfDecimals === 0) {
    return 0;
  }
  var posDecimalSeparator = pattern.indexOf(DECIMAL_SEPARTOR);
  var decimals = pattern.substr(posDecimalSeparator + 1, posDecimalSeparator + numberOfDecimals);
  var firstOptionalDecimal = decimals.indexOf('#');

  return firstOptionalDecimal === -1 ? numberOfDecimals : firstOptionalDecimal;
};

var getSizeOfGroup = exports.getSizeOfGroup = function getSizeOfGroup(format) {
  var posGroupSeparator = format.indexOf(GROUP_SEPARTOR);
  var posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);

  if (posDecimalSeparator < 0) {
    return format.length - posGroupSeparator - 1;
  }
  return posDecimalSeparator - posGroupSeparator - 1;
};