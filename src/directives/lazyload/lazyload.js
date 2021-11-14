/**
 * Empty gif image as placeholder
 */
const emptyPlaceholder =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const sizePlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 <width> <height>'%3E%3C/svg%3E";

/**
 * Bind Directive
 */
const bind = (el, binding) => {
  if (el.tagName.toLowerCase() !== "img") {
    console.error("Can not use v-lazy-load on non IMG elements!", el);
    return false;
  }

  // Arguments as array
  const args = binding.arg
    ? binding.arg.split(":").map((arg) => arg.toLowerCase())
    : [];

  // If there is a IntersectionObserver available
  // create a placeholder for the image
  if ("IntersectionObserver" in window) {
    if (args.length > 0) {
      // Create placeholder with width and height
      if (args.length === 2 && !isNaN(args[0]) && !isNaN(args[1])) {
        el.src = sizePlaceholder
          .replace("<width>", args[0])
          .replace("<height>", args[1]);
      }
      // Create placeholder with same width and height
      else if (args.length === 1 && !isNaN(args[0])) {
        el.src = sizePlaceholder
          .replace("<width>", args[0])
          .replace("<height>", args[0]);
      }
      // Create empty placeholder
      else {
        el.src = emptyPlaceholder;
      }
    } else {
      // Create placeholder based on img width/height
      if (
        !isNaN(parseInt(el.getAttribute("width"))) &&
        !isNaN(parseInt(el.getAttribute("height")))
      ) {
        el.src = sizePlaceholder
          .replace("<width>", el.getAttribute("width"))
          .replace("<height>", el.getAttribute("height"));
      } else {
        el.src = emptyPlaceholder;
      }
    }
  }
};

/**
 * Directive
 */
const directive = (el, binding) => {
  // Image Source
  const source = binding.value;

  // Handle intercection
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        el.src = source;
        observer.unobserve(el);
      }
    });
  };

  // Create Observer to see if the image is in the page view
  const createObserver = () => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0,
    });
    observer.observe(el);
  };

  // If there is no IntersectionObserver available
  // then just load the image.
  if (!("IntersectionObserver" in window)) {
    el.src = source;
  } else {
    createObserver();
  }
};

/**
 * Lazy Load Directive
 */
export const lazyload = {
  bind: bind,
  inserted: directive,
};
