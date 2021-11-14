const directive = (el, binding) => {
  // Value
  var value = binding.value;

  // Arguments as array
  const args = binding.arg
    ? binding.arg.split(":").map((arg) => arg.toLowerCase())
    : [];

  // Set innerText/Value of element
  const updateElementValue = (v) => {
    el.innerText = v;
  };

  // Uppercase
  if (args.includes("upper")) {
    updateElementValue(value.toUpperCase());
  }

  // Lowercase
  else if (args.includes("lower")) {
    updateElementValue(value.toLowerCase());
  }

  // Title case
  else if (args.includes("title")) {
    value = value.toLowerCase();
    updateElementValue(value.charAt(0).toUpperCase() + value.slice(1));
  }

  // Capitalize
  else if (args.includes("capital")) {
    value = value.toLowerCase();
    updateElementValue(
      value.replace(/(^\w{1})|(\s{1}\w{1})/g, (c) => c.toUpperCase())
    );
  }

  // Swap case
  else if (args.includes("swap")) {
    updateElementValue(
      [...value]
        .map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
        .join("")
    );
  }

  // Camel case
  else if (args.includes("camel")) {
    value = value
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
    updateElementValue(value.slice(0, 1).toLowerCase() + value.slice(1));
  }

  // Kebab case
  else if (args.includes("kebab")) {
    value = value
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join("-");
    updateElementValue(value.slice(0, 1).toLowerCase() + value.slice(1));
  }

  // Pascal case
  else if (args.includes("pascal")) {
    updateElementValue(
      value
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
        .join("")
    );
  }

  // Snake case
  else if (args.includes("snake")) {
    updateElementValue(
      value
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.toLowerCase())
        .join("_")
    );
  }

  // Return plain text without modifications
  else {
    updateElementValue(value);
  }
};

/**
 * To Case Directive
 */
export const tocase = {
  bind: directive,
  update: directive,
};
