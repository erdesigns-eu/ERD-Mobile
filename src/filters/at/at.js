/**
 * Get item/character at index of Array/String
 *
 * @param {Array/String} value
 * @param {Number} index
 */
export function at(value, index) {
  if (!value || !index || !value[index]) {
    return "";
  }
  return value[index];
}
