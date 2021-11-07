/**
 * Get value from Object
 *
 * @param {Object} value
 * @param {String/Number} accessor
 */
export function get(value, accessor) {
  var ret = undefined;
  if (value !== Object(value)) {
    return value;
  }
  if (accessor == undefined) {
    return value;
  }
  if (Object.prototype.toString.call(accessor) === "[object String]") {
    accessor = accessor.split(".");
    ret = value;
    try {
      for (var i = 0; i < accessor.length; i++) {
        ret = ret[accessor[i]];
      }
    } catch (e) {
      ret = undefined;
    }
  } else if (Object.prototype.toString.call(accessor) === "[object Function]") {
    ret = accessor(value);
  }
  return ret;
}
