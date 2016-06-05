import { round, trunc, getDecimalPart } from './krokusMath';
import { getNumberOfDecimals, getNumberOfRequiredDecimals, formatIntegerPart, formatDecimalPart, isValidFormatPattern, replaceFormatWithNumber, CURRENCY_SYMBOL } from './krokusFormat';

/**
 * formatPattern = { pattern, decimal_sep, group_sep }
 * pattern: #,##0.00
 */
const formatNumber = (number, formatPattern) => {
  const pattern = formatPattern.pattern;
  if (!isValidFormatPattern(pattern)) {
    throw 'Given format is wrong';
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
    throw 'Given format is wrong';
  }

  const formattedNumber = formatNumber(number, formatPattern);
  let formattedCurrency = replaceFormatWithNumber(formatPattern.pattern, formattedNumber);
  return formattedCurrency.replace(CURRENCY_SYMBOL, formatPattern.symbol);
}

const krokus = {
  formatNumber,
  formatCurrency
}

export default krokus;
