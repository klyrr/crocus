Krokus
=====================

[![Build Status](https://travis-ci.org/klyrr/krokus.svg?branch=master)](https://travis-ci.org/klyrr/krokus)
[![Code Climate](https://codeclimate.com/github/klyrr/krokus/badges/gpa.svg)](https://codeclimate.com/github/klyrr/krokus)
[![Test Coverage](https://codeclimate.com/github/klyrr/krokus/badges/coverage.svg)](https://codeclimate.com/github/klyrr/krokus/coverage)
[![Locales 685](https://img.shields.io/badge/locales-685-green.svg)](https://img.shields.io/badge/locales-685-green.svg)
[![Currencies 297](https://img.shields.io/badge/currencies-297-green.svg)](https://img.shields.io/badge/currencies-297-green.svg)

A provider for localization patterns and an according number and currency formatter.

In order to have the all currency and locale patterns in one place.

[ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) is a standard to format currencies.

The locale data is generated from [CLDR29](http://unicode.org/Public/cldr/29/core.zip) and the currency data is generated from [ISO](http://www.currency-iso.org/dam/downloads/lists/list_one.xml)

Usage
-----

### Use the krokus formatter
```javascript
const krokus = require('krokus');

const formatCurrencyPattern = {
  pattern: '#,##0.00 ¤',
  decimal_sep: ',',
  group_sep: '.',
  symbol: '€',
};

> krokus.formatCurrency(10000, formatCurrencyPattern);
10.000,00 €
```

### Use the krokus parser
```javascript
const krokus = require('krokus');

const formatCurrencyPattern = {
  pattern: '#,##0.00 ¤',
  decimal_sep: ',',
  group_sep: '.',
  symbol: '€',
};

> krokus.parseCurrency('10.000,00 €', formatPattern);
10000
```

### Access the generated currency and locale settings
```javascript
const krokus = require('krokus');

> krokus.locales.de_DE
{ number_pattern: '#,##0.###',
  currency_pattern: '#,##0.00 ¤',
  decimal_sep: ',',
  group_sep: '.' }

> krokus.currencies.EUR
{ decimal: '2', symbol: 'EUR' }
```

#### Run the tests if the formats are still generating the expected formatted numbers in JS

```
npm test
```

#### Generate the krokus number formatter from the es6 files

```
npm run compile
```

#### Create the an up-to-date version of the json files

```
rake update
```
