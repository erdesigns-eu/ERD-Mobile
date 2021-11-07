/**
 * Does array contain item?
 *
 * @param {Array} value
 * @param {Number/String/Object} item
 * @returns {Boolean}
 */
export function contains(value, item, yes = true, no = false) {
  if (!value || !item) {
    return no;
  }
  return value.includes(item) ? yes : no;
}
