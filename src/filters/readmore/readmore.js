/**
 * Read more - Return a part of the text with a suffix (...)
 *
 * @param {String} value
 * @param {Number} length
 * @param {String} suffix
 * @returns {String}
 */
export function readMore(value, length, suffix = "...") {
  if (!value) {
    return "";
  }
  const text = value.toString();
  return text.substring(0, length) + suffix;
}
