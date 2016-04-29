export const round = (number, decimals) => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
