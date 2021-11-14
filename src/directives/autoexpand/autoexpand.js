/**
 * Auto Expand Textarea function
 */
const autoExpand = (e) => {
  const el = e.target;

  // Reset field height
  el.style.height = "inherit";

  // Get computed style for the Textarea
  let style = window.getComputedStyle(el);

  // Calculate height
  let height =
    parseFloat(style.paddingTop) +
    el.scrollHeight +
    parseFloat(style.paddingBottom);

  // Set Textarea height
  el.style.height = `${height}px`;
};

/**
 * Bind directive
 */
const bind = (el) => {
  if (el.tagName.toLowerCase() !== "textarea") {
    console.error("Can not use v-auto-expand on non TextArea elements!", el);
    return false;
  }
  el.addEventListener("input", autoExpand);
};

/**
 * Unbind directive
 */
const unbind = (el) => {
  el.removeEventListener("input", autoExpand);
};

/**
 * Auto Expand Textarea Directive
 */
export const autoexpand = {
  bind: bind,
  unbind: unbind,
};
