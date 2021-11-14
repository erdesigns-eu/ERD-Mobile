const directive = (el, binding) => {
  // Arguments as array
  const args = binding.arg
    ? binding.arg.split(":").map((arg) => arg.toLowerCase())
    : [];

  // Value
  const value = binding.value;

  // If value is set to false, remove the heartbeat
  if (value && value === false) {
    el.classList.remove("vue-heartbeat");
    return;
  }

  // Add heartbeat class
  if (!el.classList.contains("vue-heartbeat")) {
    el.classList.add("vue-heartbeat");
  }

  // Add large class
  if (args.includes("large")) {
    el.classList.add("vue-heartbeat-large");
  }
  // Add round class
  if (args.includes("round")) {
    el.classList.add("vue-heartbeat-round");
  }

  // Set Width / Height of element/button
  if (value && value.width && value.height) {
    el.style.width = value.width;
    el.style.height = value.height;
  }
  // Set Width / Height of element/button by size
  if (value && value.size) {
    el.style.width = `${value.size}px`;
    el.style.height = `${value.size}px`;
  }
};

/**
 * Heartbeat Directive
 */
export const heartbeat = {
  bind: directive,
  update: directive,
};
