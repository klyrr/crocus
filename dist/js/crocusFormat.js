'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DECIMAL_SEPARTOR = '.';
var GROUP_SEPARTOR = ',';

var assertValidFormat = exports.assertValidFormat = function assertValidFormat(format) {
  return true;
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