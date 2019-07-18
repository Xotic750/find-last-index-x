import toLength from 'to-length-x';
import toObject from 'to-object-x';
import assertIsFunction from 'assert-is-function-x';
import splitIfBoxedBug from 'split-if-boxed-bug-x';
/**
 * Like `findIndex`, this method returns an index in the array, if an element
 * in the array satisfies the provided testing function, except it is peformed
 * in reverse. Otherwise -1 is returned.
 *
 * @param {Array} array - The array to search.
 * @throws {TypeError} If array is `null` or `undefined`-.
 * @param {Function} callback - Function to execute on each value in the array,
 *  taking three arguments: `element`, `index` and `array`.
 * @throws {TypeError} If `callback` is not a function.
 * @param {*} [thisArg] - Object to use as `this` when executing `callback`.
 * @returns {number} Returns index of positively tested element, otherwise -1.
 */

var findLastIndex = function findLastIndex(array, callback, thisArg) {
  var object = toObject(array);
  assertIsFunction(callback);
  var iterable = splitIfBoxedBug(object);
  var index = toLength(iterable.length) - 1;

  if (index < 0) {
    return -1;
  }

  while (index > -1) {
    if (callback.call(thisArg, iterable[index], index, object)) {
      return index;
    }

    index -= 1;
  }

  return -1;
};

export default findLastIndex;

//# sourceMappingURL=find-last-index-x.esm.js.map