/**
 * Return last item from array
 *
 * @param {Array} value
 * @returns {String/Number/Object}
 */
export function last(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }
  return value;
}
