/**
 * @file Search an array from the end and return the matched index.
 * @version 1.7.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module find-last-index-x
 */

'use strict';

var toLength = require('to-length-x');
var toObject = require('to-object-x');
var isString = require('is-string');
var assertIsFunction = require('assert-is-function-x');
var splitString = require('has-boxed-string-x') === false;

/**
 * Like `findIndex`, this method returns an index in the array, if an element
 * in the array satisfies the provided testing function, except it is peformed
 * in reverse. Otherwise -1 is returned.
 *
 * @param {Array} array - The array to search.
 * @throws {TypeError} If array is `null` or `undefined`-
 * @param {Function} callback - Function to execute on each value in the array,
 *  taking three arguments: `element`, `index` and `array`.
 * @throws {TypeError} If `callback` is not a function.
 * @param {*} [thisArg] - Object to use as `this` when executing `callback`.
 * @returns {number} Returns index of positively tested element, otherwise -1.
 * @example
 * var findLastIndex = require('find-index-x');
 *
 * function isPrime(element, index, array) {
 *   var start = 2;
 *   while (start <= Math.sqrt(element)) {
 *     if (element % start++ < 1) {
 *       return false;
 *     }
 *   }
 *   return element > 1;
 * }
 *
 * console.log(findLastIndex([4, 6, 8, 12, 14], isPrime)); // -1, not found
 * console.log(findLastIndex([4, 6, 7, 12, 13], isPrime)); // 4
 */
module.exports = function findLastIndex(array, callback, thisArg) {
  var object = toObject(array);
  assertIsFunction(callback);
  var iterable = splitString && isString(object) ? object.split('') : object;
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
