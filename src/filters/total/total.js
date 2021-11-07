/**
 * Get total (sum) from Array
 *
 * @param {Array} value
 * @param {Number/String} key
 * @returns {String/Number}
 */
export function total(value, key) {
  if (!value || !Array.isArray(value)) {
    return 0;
  }
  if (key) {
    return value.map((e) => e[key]).reduce((a, b) => a + b, 0);
  } else {
    return value.reduce((a, b) => a + b, 0);
  }
}
