/**
 * Observer
 */
let Observer = null;

/**
 * Create Observer Directive
 *
 * @param {Element} el
 * @param {Object} binding
 * @returns
 */
const directive = (el, binding) => {
  // Check that the value is a function
  if (typeof binding.value !== "function") {
    console.error("Value of v-observe needs to be a function!", el);
    return;
  }

  // Arguments as array
  const args = binding.arg
    ? binding.arg.split(":").map((arg) => arg.toLowerCase())
    : [];

  // Create observer options
  const options = {
    childList: args.includes("child") || args.length === 0,
    attributes: args.includes("attributes") || args.includes("attr"),
    attributeOldValue: args.includes("attributes") || args.includes("attr"),
    characterData: args.includes("character") || args.includes("char"),
    characterDataOldValue: args.includes("character") || args.includes("char"),
    subtree: true,
  };

  // Create and start observer
  Observer = new MutationObserver((mutations) =>
    mutations.forEach((m) => binding.value(m))
  );
  Observer.observe(el, options);
};

/**
 * Remove Observer
 *
 * @param {Element} el
 */
const unbind = () => {
  if (Observer) {
    Observer.disconnect();
  }
};

/**
 * Observe Directive
 */
export const observe = {
  bind: directive,
  unbind: unbind,
};
