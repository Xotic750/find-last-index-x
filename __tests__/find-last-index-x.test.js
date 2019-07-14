let findLastIndex;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  findLastIndex = require('../../index.js');
} else {
  findLastIndex = returnExports;
}

const itHasDoc = typeof document !== 'undefined' && document ? it : xit;

describe('findLastIndex', function() {
  const list = [5, 15, 10, 15, 20];

  it('is a function', function() {
    expect(typeof findLastIndex).toBe('function');
  });

  it('should throw when array is null or undefined', function() {
    expect(function() {
      findLastIndex();
    }).toThrow();

    expect(function() {
      findLastIndex(void 0);
    }).toThrow();

    expect(function() {
      findLastIndex(null);
    }).toThrow();
  });

  it('should find item key by predicate', function() {
    const result = findLastIndex(list, function(item) {
      return item === 15;
    });
    expect(result).toBe(3);
  });

  it('should return -1 when nothing matched', function() {
    const result = findLastIndex(list, function(item) {
      return item === 'a';
    });
    expect(result).toBe(-1);
  });

  it('should throw TypeError when function was not passed', function() {
    expect(function() {
      try {
        findLastIndex(list);
      } catch (e) {
        expect(e).toStrictEqual(jasmine.any(TypeError));
        throw e;
      }
    }).toThrow();
  });

  it('should receive all three parameters', function() {
    const foundIndex = findLastIndex(list, function(value, index, arr) {
      expect(list[index]).toBe(value);
      expect(list).toStrictEqual(arr);

      return false;
    });
    expect(foundIndex).toBe(-1);
  });

  it('should work with the context argument', function() {
    const context = {};
    findLastIndex(
      [1],
      function() {
        // eslint-disable-next-line no-invalid-this
        expect(this).toBe(context);
      },
      context,
    );
  });

  it('should work with an array-like object', function() {
    const obj = {
      0: 1,
      1: 2,
      2: 3,
      3: 2,
      length: 4,
    };
    const foundIndex = findLastIndex(obj, function(item) {
      return item === 2;
    });
    expect(foundIndex).toBe(3);
  });

  it('should work with an array-like with negative length', function() {
    const obj = {
      0: 1,
      1: 2,
      2: 3,
      3: 2,
      length: -4,
    };
    const foundIndex = findLastIndex(obj, function() {
      throw new Error('should not reach here');
    });
    expect(foundIndex).toBe(-1);
  });

  it('should work with a sparse array', function() {
    const obj = [];
    const seen = [];
    obj.length = 3;
    obj[0] = undefined;
    obj[2] = 1;
    expect(1 in obj).toBe(false);
    const foundIndex = findLastIndex(obj, function(item, idx) {
      seen.push([idx, item]);

      return item === undefined && idx === 0;
    });
    expect(foundIndex).toBe(0);
    expect(seen).toStrictEqual([[2, 1], [1, undefined], [0, undefined]]);
  });

  it('should work with a sparse array-like object', function() {
    const obj = {
      0: 1,
      2: undefined,
      length: 3.2,
    };
    const seen = [];
    const foundIndex = findLastIndex(obj, function(item, idx) {
      seen.push([idx, item]);

      return false;
    });
    expect(foundIndex).toBe(-1);
    expect(seen).toStrictEqual([[2, undefined], [1, undefined], [0, 1]]);
  });

  it('should work with arguments', function() {
    const argObj = (function() {
      return arguments;
    })('1');

    const callback = jasmine.createSpy('callback');
    findLastIndex(argObj, callback);
    expect(callback).toHaveBeenCalledWith('1', 0, argObj);
  });

  it('should work with strings', function() {
    const callback = jasmine.createSpy('callback');
    const string = '1';
    findLastIndex(string, callback);
    expect(callback).toHaveBeenCalledWith('1', 0, string);
  });

  itHasDoc('should work wih DOM elements', function() {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    fragment.appendChild(div);
    const callback = jasmine.createSpy('callback');
    findLastIndex(fragment.childNodes, callback);
    expect(callback).toHaveBeenCalledWith(div, 0, fragment.childNodes);
  });
});
