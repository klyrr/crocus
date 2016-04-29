"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var round = exports.round = function round(number, decimals) {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};