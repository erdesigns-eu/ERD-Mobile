/**
 * Get minimum from Array
 *
 * @param {Array} value
 * @param {Number/String} key
 * @returns {String/Number}
 */
export function min(value, key) {
  if (!value) {
    return false;
  }
  if (key) {
    return Math.min(...value.map((e) => e[key]));
  } else {
    return Math.min(...value);
  }
}
