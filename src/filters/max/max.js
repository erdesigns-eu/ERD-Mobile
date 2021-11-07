/**
 * Get maximum from Array
 *
 * @param {Array} value
 * @param {Number/String} key
 * @returns {String/Number}
 */
export function max(value, key) {
  if (!value) {
    return false;
  }
  if (key) {
    return Math.max(...value.map((e) => e[key]));
  } else {
    return Math.max(...value);
  }
}
