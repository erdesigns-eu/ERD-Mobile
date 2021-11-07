/**
 * Words per minute - edit this if needed.
 */
const wordsPerMinute = 225;

/**
 * Get Reading Time in minutes for given string.
 *
 * @param {String/Number} value
 * @param {Number} wpm
 * @returns {Number} Reading time in minutes
 */
export function readingTime(value, wpm) {
  if (!value) {
    return 0;
  }
  const text = value.toString();
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / (wpm || wordsPerMinute));
}

/**
 * Get Reading Time in minutes for text in element with given Id.
 *
 * @param {String/Number} value
 * @param {Number} wpm
 * @returns {Number} Reading time in minutes
 */
export function readingTimeFromId(value, wpm) {
  const element = document.getElementById(value);
  if (element) {
    const innerText = element.innerText;
    const words = innerText.trim().split(/\s+/).length;
    return Math.ceil(words / (wpm || wordsPerMinute));
  }
  return 0;
}
