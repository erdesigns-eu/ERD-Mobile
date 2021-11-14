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
   * Get Unique ID from BLOB
   */
  get blobid() {
    return window.URL.createObjectURL(new Blob([])).split("/").pop();
  }

  /**
   * Get Unique ID
   */
  get uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
