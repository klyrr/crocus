Crocus
=====================

[![Build Status](https://travis-ci.org/klyrr/crocus.svg?branch=master)](https://travis-ci.org/klyrr/crocus)
[![Code Climate](https://codeclimate.com/github/klyrr/crocus/badges/gpa.svg)](https://codeclimate.com/github/klyrr/crocus)
[![Test Coverage](https://codeclimate.com/github/klyrr/crocus/badges/coverage.svg)](https://codeclimate.com/github/klyrr/crocus/coverage)
[![Locales](https://img.shields.io/badge/locales-2-red.svg)](https://img.shields.io/badge/locales-2-red.svg)

A collection for localization patterns

In order to have the correct currency patterns in one easy to find place I started this project.

[ISO 4217] (https://en.wikipedia.org/wiki/ISO_4217)

Usage
-----

#### Run the tests if the formats are still generating the correct formatted numbers in JS and ruby.

```
  rake
  npm test
```

#### Create the a new version of format json files

```
  rake update
```

#### generate the crocus number formattedNumber from the es6 files
```
   npm run compile
```
