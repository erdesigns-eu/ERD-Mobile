/**
 * A class that creates unique id's for various components.
 *
 * @class uniqueId
 */
export class UniqueId {
  /**
   * Private variables
   */
  #length;

  /**
   * Class Constructor
   *
   * @constructor
   * @param {Number} length
   * @default 16
   */
  constructor(length = 16) {
    this.#length = length;
  }

  /**
   * Get Unique ID
   */
  get id() {
    return parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(this.#length)
        .toString()
        .replace(".", "")
    ).toString();
  }

  /**
   * Get Unique ID
   */
  get uuid() {
    return window.URL.createObjectURL(new Blob([])).split("/").pop();
  }
}
