export const round = (number, decimals) => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const trunc = x => {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

export const getDecimalPart = number => {
  const numberAsString = String(number);
  const indexOfDecimals = numberAsString.indexOf('.');
  if (indexOfDecimals < 0) {
    return 0;
  }
  return Number('0.' + numberAsString.substr(indexOfDecimals + 1));
};

export const countNumberOfDecimals = number => {
  const numberAsString = String(number);
  const indexOfDecimals = numberAsString.indexOf('.');
  if (indexOfDecimals < 0) {
    return 0;
  }
  return numberAsString.substr(indexOfDecimals + 1).length;
};
