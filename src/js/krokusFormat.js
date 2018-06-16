import { countNumberOfDecimals } from './krokusMath';

export const CURRENCY_SYMBOL = '¤';

const DECIMAL_SEPARTOR = '.';
const GROUP_SEPARTOR = ',';
const ALLOWED_NUMBER_FORMAT_CHARS = ',#0;';
const ALLOWED_GENERAL_FORMAT_CHARS =
  ALLOWED_NUMBER_FORMAT_CHARS + '- ' + CURRENCY_SYMBOL;

export const isValidFormatPattern = givenFormat => {
  let format = givenFormat.trim();
  const posGroupSeparator = format.indexOf(GROUP_SEPARTOR);
  const posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);

  if (posDecimalSeparator >= 0 && posDecimalSeparator < posGroupSeparator) {
    return false;
  }

  // currency must be first or last character of pattern or non-exiting
  const posCurrencySymbol = format.indexOf(CURRENCY_SYMBOL);
  if (
    posCurrencySymbol !== 0 &&
    posCurrencySymbol !== -1 &&
    posCurrencySymbol !== format.length - 1
  ) {
    return false;
  }

  format = format.replace(/\./g, '').trim();
  format = replaceChars(format, ALLOWED_GENERAL_FORMAT_CHARS);
  return format.length === 0 || format === CURRENCY_SYMBOL;
};

export const formatIntegerPart = (integerPart, pattern, groupSeparator) => {
  let integerPartAsString = String(integerPart);
  const groupSize = getSizeOfGroup(pattern);

  const length = integerPartAsString.length;
  let i = length - groupSize;

  while (i > 0) {
    integerPartAsString =
      integerPartAsString.substr(0, i) +
      groupSeparator +
      integerPartAsString.substr(i);
    i = i - groupSize;
  }

  return integerPartAsString;
};

export const formatDecimalPart = (
  number,
  decimalPart,
  numberOfMaximumDecimals,
  numberOfMinimumDecimals,
  decimalSeparator
) => {
  if (decimalPart === 0 && numberOfMinimumDecimals === 0) {
    return '';
  }
  if (decimalPart === 0) {
    return decimalSeparator + new Array(numberOfMinimumDecimals + 1).join('0');
  }

  if (numberOfMinimumDecimals > 0 || numberOfMaximumDecimals > 0) {
    const numberOfActualDecimals = countNumberOfDecimals(number);
    // cut the '0.'
    const decimalPartString = String(decimalPart).substr(2);
    const formattedDecimalPart = addZerosIfNeeded(
      numberOfMinimumDecimals,
      Math.min(numberOfActualDecimals, numberOfMaximumDecimals),
      decimalPartString
    );

    return decimalSeparator + formattedDecimalPart;
  }

  return '';
};

const replaceChars = (pattern, charsToBeReplaced, replacement = '') => {
  for (let i = 0; i < charsToBeReplaced.length; i++) {
    pattern = pattern
      .replace(new RegExp(charsToBeReplaced[i], 'g'), replacement)
      .trim();
  }
  return pattern;
};

const addZerosIfNeeded = (
  numberOfMinimumDecimals,
  numberOfActualDecimals,
  decimalPartString
) => {
  const zerosToAdd = numberOfMinimumDecimals - decimalPartString.length;

  return zerosToAdd <= 0
    ? decimalPartString.substr(0, numberOfActualDecimals)
    : decimalPartString + new Array(zerosToAdd + 1).join('0');
};

export const replaceFormatWithNumber = (pattern, formattedNumber) => {
  pattern = pattern.replace(/\./g, '@').trim();
  pattern = replaceChars(pattern, ALLOWED_NUMBER_FORMAT_CHARS, '@');
  pattern = pattern.replace('@', formattedNumber);
  return pattern.split('@').join('');
};

export const getNumberOfDecimals = pattern => {
  const posDecimalSeparator = pattern.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator < 0) {
    return 0;
  }
  // if currency pattern cut the currency symbol
  const posSpace = pattern.indexOf(' ', posDecimalSeparator);

  // look also for non-breaking space
  const posNBSpace = pattern.indexOf(' ', posDecimalSeparator);

  if (posSpace >= 0) {
    pattern = pattern.substr(0, posSpace);
  } else if (posNBSpace >= 0) {
    pattern = pattern.substr(0, posNBSpace);
  }
  return pattern.length - posDecimalSeparator - 1;
};

export const getNumberOfRequiredDecimals = pattern => {
  const numberOfDecimals = getNumberOfDecimals(pattern);
  if (numberOfDecimals === 0) {
    return 0;
  }
  const posDecimalSeparator = pattern.indexOf(DECIMAL_SEPARTOR);
  const decimals = pattern.substr(
    posDecimalSeparator + 1,
    posDecimalSeparator + numberOfDecimals
  );
  const firstOptionalDecimal = decimals.indexOf('#');

  return firstOptionalDecimal === -1 ? numberOfDecimals : firstOptionalDecimal;
};

export const getSizeOfGroup = format => {
  const posGroupSeparator = format.indexOf(GROUP_SEPARTOR);
  const posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);

  if (posDecimalSeparator < 0) {
    return format.length - posGroupSeparator - 1;
  }
  return posDecimalSeparator - posGroupSeparator - 1;
};

export const checkFormattedNumber = (formattedNumber, decimalSep, groupSep) => {
  // formattedNumber is a string and it has to be validated if it is a valid number
  if (typeof formattedNumber !== 'string') {
    return false;
  }
  const allowedChars = `[${decimalSep}${groupSep}-\\d]`;
  const hasNotAllowedChars = formattedNumber.replace(
    new RegExp(allowedChars, 'g'),
    ''
  );

  if (hasNotAllowedChars.length > 0) {
    return false;
  }

  const splitNumber = formattedNumber.split(decimalSep);
  return splitNumber.length === 2 || splitNumber.length === 1;
};
