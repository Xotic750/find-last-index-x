<a href="https://travis-ci.org/Xotic750/find-last-index-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/find-last-index-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/find-last-index-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/find-last-index-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/find-last-index-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/find-last-index-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/find-last-index-x" title="npm version">
<img src="https://badge.fury.io/js/find-last-index-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_find-last-index-x"></a>

## find-last-index-x
Search an array from the end and return the matched index.

**Version**: 2.1.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_find-last-index-x--module.exports"></a>

### `module.exports(array, callback, [thisArg])` ⇒ <code>number</code> ⏏
Like `findIndex`, this method returns an index in the array, if an element
in the array satisfies the provided testing function, except it is peformed
in reverse. Otherwise -1 is returned.

**Kind**: Exported function  
**Returns**: <code>number</code> - Returns index of positively tested element, otherwise -1.  
**Throws**:

- <code>TypeError</code> If array is `null` or `undefined`-
- <code>TypeError</code> If `callback` is not a function.


| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to search. |
| callback | <code>function</code> | Function to execute on each value in the array,  taking three arguments: `element`, `index` and `array`. |
| [thisArg] | <code>\*</code> | Object to use as `this` when executing `callback`. |

**Example**  
```js
var findLastIndex = require('find-index-x');

function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log(findLastIndex([4, 6, 8, 12, 14], isPrime)); // -1, not found
console.log(findLastIndex([4, 6, 7, 12, 13], isPrime)); // 4
```
