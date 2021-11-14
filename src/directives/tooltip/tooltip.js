const directive = (el, binding) => {
  // Create data attribute with tooltip content
  el.setAttribute("data-tooltip", binding.value);

  // Arguments as array
  const args = binding.arg
    ? binding.arg.split(":").map((arg) => arg.toLowerCase())
    : [];

  // Modifiers
  const modifiers = binding.modifiers;

  // Create data attribute with tooltip position
  if (args.includes("right")) {
    el.setAttribute("data-tooltip-location", "right");
  } else if (args.includes("bottom")) {
    el.setAttribute("data-tooltip-location", "bottom");
  } else if (args.includes("left")) {
    el.setAttribute("data-tooltip-location", "left");
  } else {
    el.setAttribute("data-tooltip-location", "top");
  }

  // Create data attribute with tooltip size
  if (modifiers.sm || args.includes("sm")) {
    el.setAttribute("data-tooltip-size", "sm");
  } else if (modifiers.md || args.includes("md")) {
    el.setAttribute("data-tooltip-size", "md");
  } else if (modifiers.lg || args.includes("lg")) {
    el.setAttribute("data-tooltip-size", "lg");
  } else if (modifiers.xl || args.includes("xl")) {
    el.setAttribute("data-tooltip-size", "xl");
  } else {
    el.setAttribute("data-tooltip-size", "fit");
  }

  // If there is a show modifier, we want to show the tooltip by default
  // This data attribute can also be used to toggle the tooltip with javascript.
  if (modifiers.show || args.includes("show")) {
    el.setAttribute("data-tooltip-show", "");
  }
};

/**
 * Tooltip Directive
 */
export const tooltip = {
  bind: directive,
  update: directive,
};
