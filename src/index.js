export {
  formatCurrency,
  formatNumber,
  parseCurrency,
  parseNumber,
} from './js/krokus.js';

import currencyList from './generated/currencies.json';
import localeList from './generated/locales.json';

export const currencies = currencyList;
export const locales = localeList;
