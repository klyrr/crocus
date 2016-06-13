const krokus = require('./dist/js/krokus.js').default;
krokus.currencies = require('./dist/currency.json');
krokus.locales = require('./dist/locale.json');

module.exports = krokus;
