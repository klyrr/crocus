import {round} from './crocusMath';
import {getNumberOfDecimals, getSizeOfGroup} from './crocusFormat';

/**
 * formatPattern = { pattern, decimal_sep, group_sep, symbol }
 * pattern: #,##0.00
 */
const formatNumber = (number, formatPattern) => {
  const numberOfDecimals = getNumberOfDecimals(formatPattern.pattern);
  const roundedNumber = round(number, numberOfDecimals);
  const groupSize = getSizeOfGroup(formatPattern.pattern);

  const integerPart = Math.trunc(roundedNumber);
  const decimalPart = roundedNumber - integerPart;

  let numberAsString = new String(integerPart);

  let length = numberAsString.length;
  let i = length - groupSize;
  let numberOfGroups = 0;
  while (i > 0) {
    numberAsString = numberAsString.substr(0, i) + formatPattern.group_sep + numberAsString.substr(i);
    i = i - groupSize;
  }

  if (numberOfDecimals > 0) {
    let formattedDecimalPart = '';
    if (decimalPart == 0) {
      formattedDecimalPart = '0'.repeat(numberOfDecimals);
    } else {
      formattedDecimalPart = new String(decimalPart).substr(2).substr(0, numberOfDecimals);
    }
    numberAsString = numberAsString + formatPattern.decimal_sep + formattedDecimalPart;
  }

  return numberAsString;
}

/**
 * formatPattern = { pattern, decimal_sep, group_sep }
 * pattern: #,##0.00
 */
const formatCurrency = (number, formatPattern) => {
  return formatNumber(number, formatPattern) + ' €';
}

const crocus = {
  formatNumber,
  formatCurrency
}

export default crocus;
