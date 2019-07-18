import findLastIndex from '../src/find-last-index-x';

const itHasDoc = typeof document !== 'undefined' && document ? it : xit;

describe('findLastIndex', function() {
  const list = [5, 15, 10, 15, 20];

  it('is a function', function() {
    expect.assertions(1);
    expect(typeof findLastIndex).toBe('function');
  });

  it('should throw when array is null or undefined', function() {
    expect.assertions(3);
    expect(function() {
      findLastIndex();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      findLastIndex(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      findLastIndex(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should find item key by predicate', function() {
    expect.assertions(1);
    const result = findLastIndex(list, function(item) {
      return item === 15;
    });
    expect(result).toBe(3);
  });

  it('should return -1 when nothing matched', function() {
    expect.assertions(1);
    const result = findLastIndex(list, function(item) {
      return item === 'a';
    });
    expect(result).toBe(-1);
  });

  it('should throw TypeError when function was not passed', function() {
    expect.assertions(2);
    expect(function() {
      try {
        findLastIndex(list);
      } catch (e) {
        expect(e).toStrictEqual(expect.any(TypeError));
        throw e;
      }
    }).toThrowErrorMatchingSnapshot();
  });

  it('should receive all three parameters', function() {
    expect.assertions(11);
    const foundIndex = findLastIndex(list, function(value, index, arr) {
      expect(list[index]).toBe(value);
      expect(list).toStrictEqual(arr);

      return false;
    });
    expect(foundIndex).toBe(-1);
  });

  it('should work with the context argument', function() {
    expect.assertions(1);
    const context = {};
    findLastIndex(
      [1],
      function() {
        /* eslint-disable-next-line babel/no-invalid-this */
        expect(this).toBe(context);
      },
      context,
    );
  });

  it('should work with an array-like object', function() {
    expect.assertions(1);
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
    expect.assertions(1);
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
    expect.assertions(3);
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
    expect.assertions(2);
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
    expect.assertions(1);
    const argObj = (function() {
      return arguments;
    })('1');

    const callback = jest.fn();
    findLastIndex(argObj, callback);
    expect(callback).toHaveBeenCalledWith('1', 0, argObj);
  });

  it('should work with strings', function() {
    expect.assertions(1);
    const callback = jest.fn();
    const string = '1';
    findLastIndex(string, callback);
    expect(callback).toHaveBeenCalledWith('1', 0, string);
  });

  itHasDoc('should work wih DOM elements', function() {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    fragment.appendChild(div);
    const callback = jest.fn();
    findLastIndex(fragment.childNodes, callback);
    expect(callback).toHaveBeenCalledWith(div, 0, fragment.childNodes);
  });
});
