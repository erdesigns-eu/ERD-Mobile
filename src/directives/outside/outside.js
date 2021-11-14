let callback;
let element;

/**
 * Array of events - we need these to remove the event listeners.
 */
let events = [];

/**
 * Array of events that are allowed.
 */
const allowedEvents = [
  "change",
  "click",
  "mouseover",
  "mouseout",
  "mousedown",
  "mouseup",
  "mousemove",
  "keypress",
  "keydown",
  "keyup",
  "focus",
  "blur",
  "touchstart",
  "touchend",
  "touchmove",
  "touchcancel",
  "scroll",
];

/**
 * Event handler
 *
 * @param {Event} e
 */
const onOutside = (e) => {
  if (!element.contains(e.target)) {
    callback(e);
  }
};

/**
 * On Outside Directive
 *
 * @param {Element} el
 * @param {Function} binding
 * @returns
 */
const directive = (el, binding) => {
  // Check that the value is a function
  if (typeof binding.value !== "function") {
    console.error("Value of v-outside needs to be a function!", el);
    return;
  }

  // Set variables
  callback = binding.value;
  element = el;

  // Arguments as array
  const args = binding.arg
    ? binding.arg.split(":").map((arg) => arg.toLowerCase())
    : [];

  // Add event listeners
  if (args.length === 0) {
    events.push("click");
    document.addEventListener("click", onOutside, { passive: true });
  } else {
    args.forEach((e) => {
      const event = e.toLowerCase();
      if (allowedEvents.includes(event)) {
        events.push(event);
        document.addEventListener(event, onOutside, { passive: true });
      }
    });
  }
};

/**
 * Remove event listener
 */
const unbind = () => {
  events.forEach((event) => {
    document.removeEventListener(event, onOutside);
  });
};

/**
 * Outside Directive
 */
export const outside = {
  bind: directive,
  unbind: unbind,
};
