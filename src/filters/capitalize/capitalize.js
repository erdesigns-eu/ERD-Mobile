/**
 * Get Capitalized String
 *
 * @param {String} value
 * @param {Boolean} allWords
 * @returns {String}
 */
export function capitalize(value, allWords) {
  const text = value.toString().toLowerCase();
  if (allWords) {
    return text.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
      match.toUpperCase()
    );
  } else {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
