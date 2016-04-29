"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var round = exports.round = function round(number, decimals) {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

var trunc = exports.trunc = function trunc(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};