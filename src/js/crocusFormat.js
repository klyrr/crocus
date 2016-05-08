const DECIMAL_SEPARTOR = '.';
const GROUP_SEPARTOR = ',';
const CURRENCY_SYMBOL = '¤';
const ALLOWED_NUMBER_FORMAT_CHARS = ',#0;- ' + CURRENCY_SYMBOL;

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
  for (let i = 0; i < ALLOWED_NUMBER_FORMAT_CHARS.length; i++) {
    formatToBeChecked = formatToBeChecked.replace(new RegExp(ALLOWED_NUMBER_FORMAT_CHARS[i],'g'), '').trim();
  }
  return formatToBeChecked.length === 0 || formatToBeChecked === CURRENCY_SYMBOL;
}

export const getNumberOfDecimals = (format) => {
  const posDecimalSeparator = format.indexOf(DECIMAL_SEPARTOR);
  if (posDecimalSeparator < 0) {
    return 0;
  }
  // if currency pattern cut the currency symbol
  const posSpace = format.indexOf(' ', posDecimalSeparator);
  if (posSpace >= 0) {
    format = format.substr(0, posSpace);
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
