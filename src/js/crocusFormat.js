const DECIMAL_SEPARTOR = '.';
const GROUP_SEPARTOR = ',';

export const assertValidFormat = (format) => {
  return true;
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
