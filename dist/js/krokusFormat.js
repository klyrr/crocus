'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DECIMAL_SEPARTOR = '.';
var GROUP_SEPARTOR = ',';
var CURRENCY_SYMBOL = exports.CURRENCY_SYMBOL = '¤';
var ALLOWED_NUMBER_FORMAT_CHARS = ',#0;';
var ALLOWED_GENERAL_FORMAT_CHARS = ALLOWED_NUMBER_FORMAT_CHARS + '- ' + CURRENCY_SYMBOL;

var replaceChars = function replaceChars(pattern, charsToBeReplaced) {
  var replacement = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

  for (var i = 0; i < charsToBeReplaced.length; i++) {
    pattern = pattern.replace(new RegExp(charsToBeReplaced[i], 'g'), replacement).trim();
  }
  return pattern;
};

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

var replaceFormatWithNumber = exports.replaceFormatWithNumber = function replaceFormatWithNumber(pattern, formattedNumber) {
  pattern = pattern.replace(/\./g, '@').trim();
  pattern = replaceChars(pattern, ALLOWED_NUMBER_FORMAT_CHARS, '@');
  pattern = pattern.replace('@', formattedNumber);
  return pattern.split('@').join('');
};

var getNumberOfDecimals = exports.getNumberOfDecimals = function getNumberOfDecimals(format) {
  var posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator < 0) {
    return 0;
  }
  // if currency pattern cut the currency symbol
  var posSpace = format.indexOf(' ', posDecimalSeparator);

  // look also for non-breaking space
  var posNBSpace = format.indexOf(' ', posDecimalSeparator);

  if (posSpace >= 0) {
    format = format.substr(0, posSpace);
  } else if (posNBSpace >= 0) {
    format = format.substr(0, posNBSpace);
  }
  return format.length - posDecimalSeparator - 1;
};

var getSizeOfGroup = exports.getSizeOfGroup = function getSizeOfGroup(format) {
  var posGroupSeparator = format.indexOf(GROUP_SEPARTOR);
  var posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);

  if (posDecimalSeparator < 0) {
    return format.length - posGroupSeparator - 1;
  }
  return posDecimalSeparator - posGroupSeparator - 1;
};