import toLength from 'to-length-x';
import toObject from 'to-object-x';
import assertIsFunction from 'assert-is-function-x';
import splitIfBoxedBug from 'split-if-boxed-bug-x';
import call from 'simple-call-x';

// eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature
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
// eslint-enable jsdoc/check-param-names
const findLastIndex = function findLastIndex(array, callback) {
  const object = toObject(array);
  assertIsFunction(callback);
  const iterable = splitIfBoxedBug(object);
  const thisArg = arguments[2]; /* eslint-disable-line prefer-rest-params */
  let index = toLength(iterable.length) - 1;
  while (index > -1) {
    if (call(callback, thisArg, [iterable[index], index, object])) {
      return index;
    }

    index -= 1;
  }

  return -1;
};

export default findLastIndex;
