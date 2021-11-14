/**
 * Directive options
 */
const options = {
  delay: 400,
  interval: 50,
};

/**
 * Directive
 */
const directive = (el, binding) => {
  // Value
  const value = binding.value;

  // Check that the value is a function
  if (typeof value !== "function") {
    return;
  }

  // Timer/Interval handles
  let timer = null;
  let interval = null;

  // Start longpress
  const start = function (e) {
    // Ignore click events - we only want mousedown/touchstart
    if (e.type === "click" && e.button !== 0) {
      return;
    }
    // Create timer and interval where we call the handler
    if (timer === null) {
      timer = setTimeout(function () {
        if (options.interval > 0) {
          interval = setInterval(function () {
            value(e);
          }, options.interval);
        }
        value(e);
      }, options.delay);
    }
  };

  // Cancel longpress
  const cancel = function () {
    // Clear timer
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    // Clear interval
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  };

  const startEvents = ["mousedown", "touchstart"];
  const stopEvents = [
    "click",
    "mouseup",
    "mouseout",
    "touchend",
    "touchcancel",
  ];

  // Add element event listeners
  startEvents.forEach(function (e) {
    el.addEventListener(e, start, { passive: true });
  });
  stopEvents.forEach(function (e) {
    el.addEventListener(e, cancel, { passive: true });
  });
};

/**
 * Long Click Directive
 */
export const longclick = {
  bind: directive,
};
