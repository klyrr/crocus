export const round = (number, decimals) => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export const trunc = (x) => {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
