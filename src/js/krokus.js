import {round, trunc} from './krokusMath';
import {getNumberOfDecimals, getSizeOfGroup, isValidFormatPattern, replaceFormatWithNumber, CURRENCY_SYMBOL} from './krokusFormat';

/**
 * formatPattern = { pattern, decimal_sep, group_sep }
 * pattern: #,##0.00
 */
const formatNumber = (number, formatPattern) => {
  const pattern = formatPattern.pattern;
  if (!isValidFormatPattern(pattern)) {
    throw 'Given format is wrong';
  }

  const numberOfDecimals = getNumberOfDecimals(pattern);
  const roundedNumber = round(number, numberOfDecimals);
  const groupSize = getSizeOfGroup(pattern);

  const integerPart = trunc(roundedNumber);
  const decimalPart = roundedNumber - integerPart;

  let numberAsString = String(integerPart);

  let length = numberAsString.length;
  let i = length - groupSize;
  let numberOfGroups = 0;
  while (i > 0) {
    numberAsString = numberAsString.substr(0, i) + formatPattern.group_sep + numberAsString.substr(i);
    i = i - groupSize;
  }

  if (numberOfDecimals > 0) {
    let formattedDecimalPart = '';
    if (decimalPart === 0) {
      formattedDecimalPart = new Array(numberOfDecimals + 1 ).join('0');
    } else {
      formattedDecimalPart = String(decimalPart).substr(2).substr(0, numberOfDecimals);
    }
    numberAsString = numberAsString + formatPattern.decimal_sep + formattedDecimalPart;
  }

  return numberAsString;
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
