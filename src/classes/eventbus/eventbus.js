/**
 * A simple EventBus class, which can also be used in Vanilla
 * because it doesnt require Vue.
 *
 * @class eventbus
 */
export class EventBus {
  /**
   * Private variables
   */
  #bus = Object.create(null);

  /**
   * Add Event Bus listener
   *
   * @param {String} event
   * @param {Function} handler
   */
  on(event, handler) {
    if (!this.#bus[event]) {
      this.#bus[event] = [];
    }
    this.#bus[event].push(handler);
  }

  /**
   * Remove Event Bus listener
   *
   * @param {String} event
   * @param {Function} handler
   */
  off(event, handler) {
    const i = (this.#bus[event] || []).findIndex((h) => h === handler);
    if (i > -1) {
      this.#bus[event].splice(i, 1);
    }
    if (this.#bus[event].length === 0) {
      delete this.#bus[event];
    }
  }

  /**
   * Emit an Event on the Bus
   *
   * @param {String} event
   * @param {String/Object} data
   */
  emit(event, data) {
    (this.#bus[event] || []).forEach((handler) => handler(data));
  }

  /**
   * Get all listeners
   */
  get listeners() {
    return this.#bus;
  }
}
