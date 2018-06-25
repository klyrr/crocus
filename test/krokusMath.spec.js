/* global describe it */

import {
  countNumberOfDecimals,
  getDecimalPart,
  round,
  trunc,
} from '../src/js/krokusMath';

import { assert } from 'chai';

describe('Krokus Math', () => {
  describe('round', () => {
    it('should round the numbers', () => {
      assert.equal(round(23.44, 2), 23.44);
      assert.equal(round(23.442, 2), 23.44);
      assert.equal(round(23.446, 2), 23.45);
      assert.equal(round(23.44, 1), 23.4);
      assert.equal(round(23.44, 4), 23.44);
      assert.equal(round(432.5579, 3), 432.558);
      assert.equal(round(-432.5579, 3), -432.558);
    });
  });

  describe('trunc', () => {
    it('should trunc the given numbers', () => {
      assert.equal(trunc(23.44), 23);
      assert.equal(trunc(23), 23);
    });
  });

  describe('countNumberOfDecimals', () => {
    it('should return the number of decimals', () => {
      assert.equal(countNumberOfDecimals(23.44), 2);
      assert.equal(countNumberOfDecimals(23), 0);
      assert.equal(countNumberOfDecimals(23.76262), 5);
      assert.equal(countNumberOfDecimals(-23.76262), 5);
    });
  });

  describe('getDecimalPart', () => {
    it('should return the number of decimals', () => {
      assert.equal(getDecimalPart(23.44), 0.44);
      assert.equal(getDecimalPart(23), 0);
      assert.equal(getDecimalPart(23.76262), 0.76262);
      assert.equal(getDecimalPart(-23.76262), 0.76262);
    });
  });
});
