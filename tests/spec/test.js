'use strict';

var findLastIndex;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  findLastIndex = require('../../index.js');
} else {
  findLastIndex = returnExports;
}

describe('findLastIndex', function () {
  var list = [
    5,
    15,
    10,
    15,
    20
  ];

  it('should find item key by predicate', function () {
    var result = findLastIndex(list, function (item) {
      return item === 15;
    });
    expect(result).toBe(3);
  });

  it('should return -1 when nothing matched', function () {
    var result = findLastIndex(list, function (item) {
      return item === 'a';
    });
    expect(result).toBe(-1);
  });

  it('should throw TypeError when function was not passed', function () {
    expect(function () {
      try {
        findLastIndex(list);
      } catch (e) {
        expect(e).toEqual(jasmine.any(TypeError));
        throw e;
      }
    }).toThrow();
  });

  it('should receive all three parameters', function () {
    var foundIndex = findLastIndex(list, function (value, index, arr) {
      expect(list[index]).toBe(value);
      expect(list).toEqual(arr);
      return false;
    });
    expect(foundIndex).toBe(-1);
  });

  it('should work with the context argument', function () {
    var context = {};
    findLastIndex([1], function () {
      // eslint-disable-next-line no-invalid-this
      expect(this).toBe(context);
    }, context);
  });

  it('should work with an array-like object', function () {
    var obj = {
        0: 1, 1: 2, 2: 3, 3: 2, length: 4
      },
      foundIndex = findLastIndex(obj, function (item) {
        return item === 2;
      });
    expect(foundIndex).toBe(3);
  });

  it('should work with an array-like with negative length', function () {
    var obj = {
      0: 1, 1: 2, 2: 3, 3: 2, length: -4
    };
    var foundIndex = findLastIndex(obj, function () {
      throw new Error('should not reach here');
    });
    expect(foundIndex).toBe(-1);
  });

  it('should work with a sparse array', function () {
    var obj = [];
    var seen = [];
    obj.length = 3;
    obj[0] = undefined;
    obj[2] = 1;
    expect(1 in obj).toBe(false);
    var foundIndex = findLastIndex(obj, function (item, idx) {
      seen.push([idx, item]);
      return item === undefined && idx === 0;
    });
    expect(foundIndex).toBe(0);
    expect(seen).toEqual([
      [2, 1],
      [1, undefined],
      [0, undefined]
    ]);
  });

  it('should work with a sparse array-like object', function () {
    var obj = {
      0: 1, 2: undefined, length: 3.2
    };
    var seen = [];
    var foundIndex = findLastIndex(obj, function (item, idx) {
      seen.push([idx, item]);
      return false;
    });
    expect(foundIndex).toBe(-1);
    expect(seen).toEqual([
      [2, undefined],
      [1, undefined],
      [0, 1]
    ]);
  });
});
