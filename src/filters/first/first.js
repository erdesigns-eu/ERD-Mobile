/**
 * Return first item from array
 *
 * @param {Array} value
 * @returns {String/Number/Object}
 */
export function first(value) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
