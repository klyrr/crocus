import {
  CURRENCY_SYMBOL,
  checkFormattedNumber,
  formatDecimalPart,
  formatIntegerPart,
  getNumberOfDecimals,
  getNumberOfRequiredDecimals,
  isValidFormatPattern,
  replaceFormatWithNumber,
} from './krokusFormat';
import { getDecimalPart, round, trunc } from './krokusMath';

/**
 * formatPattern = { pattern, decimal_sep, group_sep }
 * pattern: #,##0.00
 */
export const formatNumber = (number, formatPattern) => {
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

  const integerPartAsString = formatIntegerPart(
    integerPart,
    pattern,
    formatPattern.group_sep
  );

  if (decimalPart === 0 && numberOfMinimumDecimals === 0) {
    return integerPartAsString;
  }

  const decimalPartAsString = formatDecimalPart(
    number,
    decimalPart,
    numberOfMaximumDecimals,
    numberOfMinimumDecimals,
    formatPattern.decimal_sep
  );

  return integerPartAsString + decimalPartAsString;
};

/**
 * formatPattern = { pattern, decimal_sep, group_sep, symbol }
 * pattern: #,##0.00
 */
export const formatCurrency = (number, formatPattern) => {
  if (!isValidFormatPattern(formatPattern.pattern)) {
    throw 'Given format is wrong: ' + formatPattern.pattern;
  }
  if (typeof number !== 'number') {
    return number;
  }

  const formattedNumber = formatNumber(number, formatPattern);
  const formattedCurrency = replaceFormatWithNumber(
    formatPattern.pattern,
    formattedNumber
  );
  return formattedCurrency.replace(CURRENCY_SYMBOL, formatPattern.symbol);
};

/** Parsing */

export const parseNumber = (formattedNumber, formatPattern) => {
  if (!isValidFormatPattern(formatPattern.pattern)) {
    throw 'Given format is wrong: ' + formatPattern.pattern;
  }

  if (
    !checkFormattedNumber(
      formattedNumber,
      formatPattern.decimal_sep,
      formatPattern.group_sep
    )
  ) {
    throw 'Given formatted number is wrong: ' + formattedNumber;
  }

  const decimalSep = formatPattern.decimal_sep;
  if (formattedNumber.charAt(formattedNumber.length - 1) === decimalSep) {
    return parseFloat(formattedNumber);
  }

  const splitNumber = formattedNumber.split(decimalSep);
  if (splitNumber.length !== 2 && splitNumber.length !== 1) {
    return false;
  }

  const groupSep = formatPattern.group_sep;
  const integerPart = splitNumber[0].split(groupSep).join('');
  const decimalPart = splitNumber[1] ? splitNumber[1] : '';

  return parseFloat(`${integerPart}.${decimalPart}`);
};

/**
 * formatPattern = { pattern, decimal_sep, group_sep }
 * pattern: #,##0.00
 */
export const parseCurrency = (formattedCurrency, formatPattern) => {
  if (!isValidFormatPattern(formatPattern.pattern)) {
    throw 'Given format is wrong: ' + formatPattern.pattern;
  }

  const formattedNumber = formattedCurrency
    .replace(formatPattern.symbol, '')
    .trim();

  return parseNumber(formattedNumber, formatPattern);
};
