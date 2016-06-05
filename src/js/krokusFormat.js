const DECIMAL_SEPARTOR = '.';
const GROUP_SEPARTOR = ',';
export const CURRENCY_SYMBOL = '¤';
const ALLOWED_NUMBER_FORMAT_CHARS = ',#0;';
const ALLOWED_GENERAL_FORMAT_CHARS = ALLOWED_NUMBER_FORMAT_CHARS + '- ' + CURRENCY_SYMBOL;

const replaceChars = (pattern, charsToBeReplaced, replacement = '') => {
  for (let i = 0; i < charsToBeReplaced.length; i++) {
    pattern = pattern.replace(new RegExp(charsToBeReplaced[i],'g'), replacement).trim();
  }
  return pattern;
}

export const isValidFormatPattern = (format) => {
  format = format.trim();
  const posGroupSeparator = format.indexOf(GROUP_SEPARTOR);
  const posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator >= 0 && posDecimalSeparator < posGroupSeparator) {
    return false;
  }
  const posCurrencySymbol = format.indexOf(CURRENCY_SYMBOL);

  // currency must be first or last character of pattern or non-exiting
  if (posCurrencySymbol !== 0 && posCurrencySymbol !== -1 && posCurrencySymbol !== (format.length -1)) {
    return false;
  }
  let formatToBeChecked = format;
  formatToBeChecked = formatToBeChecked.replace(/\./g, '').trim();
  formatToBeChecked = replaceChars(formatToBeChecked, ALLOWED_GENERAL_FORMAT_CHARS);
  return formatToBeChecked.length === 0 || formatToBeChecked === CURRENCY_SYMBOL;
}

export const replaceFormatWithNumber = (pattern, formattedNumber) => {
  pattern = pattern.replace(/\./g, '@').trim();
  pattern = replaceChars(pattern, ALLOWED_NUMBER_FORMAT_CHARS, '@');
  pattern = pattern.replace('@', formattedNumber);
  return pattern.split('@').join('');
}

export const getNumberOfDecimals = (format) => {
  const posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator < 0) {
    return 0;
  }
  // if currency pattern cut the currency symbol
  const posSpace = format.indexOf(' ', posDecimalSeparator);

  // look also for non-breaking space
  const posNBSpace = format.indexOf(' ', posDecimalSeparator);

  if (posSpace >= 0) {
    format = format.substr(0, posSpace);
  } else if (posNBSpace >= 0) {
    format = format.substr(0, posNBSpace);
  }
  return format.length - posDecimalSeparator - 1;
};

export const getSizeOfGroup = (format) => {
  const posGroupSeparator = format.indexOf(GROUP_SEPARTOR);
  const posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);

  if (posDecimalSeparator < 0 ) {
    return format.length - posGroupSeparator - 1;
  }
  return posDecimalSeparator - posGroupSeparator - 1;
}
