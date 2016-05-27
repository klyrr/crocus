Krokus
=====================

[![Build Status](https://travis-ci.org/klyrr/krokus.svg?branch=master)](https://travis-ci.org/klyrr/krokus)
[![Code Climate](https://codeclimate.com/github/klyrr/krokus/badges/gpa.svg)](https://codeclimate.com/github/klyrr/krokus)
[![Test Coverage](https://codeclimate.com/github/klyrr/krokus/badges/coverage.svg)](https://codeclimate.com/github/klyrr/krokus/coverage)
[![Locales 716/](https://img.shields.io/badge/locales-161/716-red.svg)](https://img.shields.io/badge/locales-161/716-red.svg)

A provider for localization patterns and an according formatter.

In order to have the correct currency patterns in one easy to find place.

[ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) is a standard to format currencies.

The data is based on the current [CLDR29](http://cldr.unicode.org/index/downloads/cldr-29)

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

krokus.formatCurrency(10000, formatCurrencyPattern);
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

#### Run the tests if the formats are still generating the correct formatted numbers in JS and ruby.

```
rake
npm test
```

#### Create the a new version of format json files

```
rake update
```

#### Generate the krokus number formatter from the es6 files.

```
npm run compile
```
