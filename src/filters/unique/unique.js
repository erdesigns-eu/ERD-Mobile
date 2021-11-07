/**
 * Return unique items in array
 *
 * @param {Array} value
 * @returns {Array}
 */
export function unique(value) {
  if (!value || !Array.isArray(value)) {
    return [];
  }
  return value.filter((item, i, ar) => ar.indexOf(item) === i);
}
