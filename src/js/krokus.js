import { round, trunc, getDecimalPart } from './krokusMath';
import { getNumberOfDecimals, getNumberOfRequiredDecimals, formatIntegerPart, formatDecimalPart, isValidFormatPattern, replaceFormatWithNumber, checkFormattedNumber, CURRENCY_SYMBOL } from './krokusFormat';

/**
 * formatPattern = { pattern, decimal_sep, group_sep }
 * pattern: #,##0.00
 */
const formatNumber = (number, formatPattern) => {
  const pattern = formatPattern.pattern;
  if (!isValidFormatPattern(pattern)) {
    throw 'Given format is wrong: ' + formatPattern.pattern;
  }
  if (typeof number !== 'number') {
      return number;
  }

  const numberOfMaximumDecimals = getNumberOfDecimals(pattern);
  const numberOfMinimumDecimals = getNumberOfRequiredDecimals(pattern);

  const roundedNumber = round(number, numberOfMaximumDecimals);
  const integerPart = trunc(number);
  const decimalPart = getDecimalPart(roundedNumber);

  const integerPartAsString = formatIntegerPart(integerPart, pattern, formatPattern.group_sep);

  if (decimalPart === 0 && numberOfMinimumDecimals === 0) {
    return integerPartAsString;
  }

  const decimalPartAsString = formatDecimalPart(number, decimalPart, numberOfMaximumDecimals, numberOfMinimumDecimals, formatPattern.decimal_sep);

  return integerPartAsString + decimalPartAsString;
}

/**
 * formatPattern = { pattern, decimal_sep, group_sep, symbol }
 * pattern: #,##0.00
 */
const formatCurrency = (number, formatPattern) => {
  if (!isValidFormatPattern(formatPattern.pattern)) {
    throw 'Given format is wrong: ' + formatPattern.pattern;
  }
  if (typeof number !== 'number') {
      return number;
  }

  const formattedNumber = formatNumber(number, formatPattern);
  let formattedCurrency = replaceFormatWithNumber(formatPattern.pattern, formattedNumber);
  return formattedCurrency.replace(CURRENCY_SYMBOL, formatPattern.symbol);
}

/** Parsing */

const parseNumber = (formattedNumber, formatPattern) => {
  if (!isValidFormatPattern(formatPattern.pattern)) {
    throw 'Given format is wrong: ' + formatPattern.pattern;
  }

  if (!checkFormattedNumber(formattedNumber, formatPattern.decimal_sep, formatPattern.group_sep)) {
    throw 'Given formatted number is wrong: ' + formattedNumber;
  }

  const decimalSep = formatPattern.decimal_sep;
  if (formattedNumber.charAt(formattedNumber.length - 1) === decimalSep) {
      return parseFloat(formattedNumber);
  }

  var splitNumber = formattedNumber.split(decimalSep);
  if (splitNumber.length !== 2 && splitNumber.length !== 1) {
      return false;
  }

  const groupSep = formatPattern.group_sep;
  var d = splitNumber[0].split(groupSep).join('');

  d += '.' + (splitNumber[1] ? splitNumber[1] : '');
  return parseFloat(d);
}

/**
 *
 */
const parseCurrency = (formattedCurrency, formatPattern) => {
  if (!isValidFormatPattern(formatPattern.pattern)) {
    throw 'Given format is wrong: ' + formatPattern.pattern;
  }

  let formattedNumber = formattedCurrency.replace(formatPattern.symbol, '');
  formattedNumber = formattedNumber.trim();

  return parseNumber(formattedNumber, formatPattern);
}

const krokus = {
  formatNumber,
  formatCurrency,
  parseNumber,
  parseCurrency,
}

export default krokus;
