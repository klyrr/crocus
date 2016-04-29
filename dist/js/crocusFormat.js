'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DECIMAL_SEPARTOR = '.';
var GROUP_SEPARTOR = ',';
var ALLOWED_FORMAT_CHARS = ' ¤,#0.';

var isValidFormatPattern = exports.isValidFormatPattern = function isValidFormatPattern(format) {
  var posGroupSeparator = format.indexOf(GROUP_SEPARTOR);
  var posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator >= 0 && posDecimalSeparator < posGroupSeparator) {
    return false;
  }
  var formatToBeChecked = format;
  for (var i = 0; i < ALLOWED_FORMAT_CHARS.length; i++) {
    formatToBeChecked = formatToBeChecked.replace(new RegExp(ALLOWED_FORMAT_CHARS[i], 'g'), '').trim();
  }
  return formatToBeChecked.length === 0;
};

var getNumberOfDecimals = exports.getNumberOfDecimals = function getNumberOfDecimals(format) {
  var posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator < 0) {
    return 0;
  }
  // if currency pattern cut the currency symbol
  var posSpace = format.indexOf(' ', posDecimalSeparator);
  if (posSpace >= 0) {
    format = format.substr(0, posSpace);
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