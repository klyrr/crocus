'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var round = exports.round = function round(number, decimals) {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

var trunc = exports.trunc = function trunc(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

var getDecimalPart = exports.getDecimalPart = function getDecimalPart(number) {
  var numberAsString = String(number);
  var indexOfDecimals = numberAsString.indexOf('.');
  if (indexOfDecimals < 0) {
    return 0;
  }
  return Number("0." + numberAsString.substr(indexOfDecimals + 1));
};

var countNumberOfDecimals = exports.countNumberOfDecimals = function countNumberOfDecimals(number) {
  var numberAsString = String(number);
  var indexOfDecimals = numberAsString.indexOf('.');
  if (indexOfDecimals < 0) {
    return 0;
  }
  return numberAsString.substr(indexOfDecimals + 1).length;
};