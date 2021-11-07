/**
 * A class to manage session storage with custom encryption.
 *
 * @class session
 */
export class Session {
  /**
   * Private variables
   */
  #storage;
  #key;
  #encoder;
  #decoder;

  /**
   * Class Constructor
   *
   * @constructor
   * @param {Object} options
   */
  constructor(options) {
    if (options.persist) {
      this.#storage = window.localStorage;
    } else {
      this.#storage = window.sessionStorage;
    }
    if (options.key) {
      this.#key = options.key;
    } else {
      this.#key = this.#randomUUID();
    }
    if (options.encoder && options.decoder) {
      this.#encoder = options.encoder;
      this.#decoder = options.decoder;
    }
    if (options.startOnCreate) {
      this.start();
    }
  }

  /**
   * Generate UUID / Random ID
   *
   * @returns Random Unique ID
   */
  // eslint-disable-next-line no-dupe-class-members
  #randomUUID() {
    return window.URL.createObjectURL(new Blob([])).split("/").pop();
  }

  /**
   * Encode String
   *
   * @param {String} str
   * @returns Encoded string
   */
  // eslint-disable-next-line no-dupe-class-members
  #encode(str) {
    return this.#encoder ? this.#encoder(str) : str;
  }

  /**
   * Decode String
   *
   * @param {String} str
   * @returns Decoded string
   */
  // eslint-disable-next-line no-dupe-class-members
  #decode(str) {
    return this.#decoder ? this.#decoder(str) : str;
  }

  /**
   * Get Session data from Storage
   */
  // eslint-disable-next-line no-dupe-class-members
  #getSession() {
    return this.#storage.getItem(this.#key)
      ? JSON.parse(this.#decode(this.#storage.getItem(this.#key)))
      : {};
  }

  /**
   * Set Session data to Storage
   *
   * @param {Object} data
   */
  // eslint-disable-next-line no-dupe-class-members
  #setSession(data) {
    this.#storage.setItem(this.#key, this.#encode(JSON.stringify(data)));
  }

  /**
   * Start new Session
   */
  start() {
    let session = this.#getSession();
    session["session-id"] = this.#randomUUID();
    session["session-date"] = new Date().toISOString();
    this.#setSession(session);
  }

  /**
   * Destroy current session
   */
  destroy() {
    this.#storage.removeItem(this.#key);
  }

  /**
   * Get Session ID
   */
  get sessionId() {
    return this.#getSession()["session-id"];
  }

  /**
   * Get Session Date
   */
  get sessionDate() {
    return new Date(this.#getSession()["session-date"]);
  }

  /**
   * Get Session Exists
   */
  get sessionExists() {
    let session = this.#getSession();
    return (
      session.constructor === Object &&
      Object.entries(session).length &&
      "session-id" in session
    );
  }

  /**
   * Get Session Length
   */
  get sessionLength() {
    return Object.entries(this.#getSession()).length;
  }

  /**
   * Clear Session Data
   */
  clear() {
    let session = this.#getSession();
    this.#setSession({
      "session-id": session["session-id"],
      "session-date": session["session-date"],
    });
  }

  /**
   * Get Item from Session Data
   *
   * @param {String} key
   * @returns Session Data Item
   */
  getItem(key) {
    return this.#getSession()[key];
  }

  /**
   * Set Item in Session Data
   *
   * @param {String} key
   * @param {String} value
   */
  setItem(key, value) {
    if (key.toLowerCase() === "session-id") {
      return;
    }
    let session = this.#getSession();
    if (!("session-id" in session)) {
      this.start();
      session = this.#getSession();
    }
    session[key] = value;
    this.#setSession(session);
  }

  /**
   * Remove Item from Session Data
   *
   * @param {String} key
   */
  removeItem(key) {
    if (key.toLowerCase() === "session-id") {
      return;
    }
    let session = this.#getSession();
    delete session[key];
    this.#setSession(session);
  }

  /**
   * Session Data has Key
   *
   * @param {String} key
   */
  hasItem(key) {
    return key in this.#getSession();
  }

  /**
   * Get Key at Index from Session Data
   *
   * @param {Number} index
   * @returns Key at index
   */
  key(index) {
    return Object.entries(this.#getSession())[index];
  }
}
