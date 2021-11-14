const directive = (el, binding) => {
  // Value
  const value = binding.value;

  // Arguments as array
  const args = binding.arg
    ? binding.arg.split(":").map((arg) => arg.toLowerCase())
    : [];

  // Convert input string to HTML Elements
  const stringToHTML = function (str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body || document.createElement("body");
  };

  // Remove scripts from the HTML
  const removeScript = function (html) {
    let scripts = html.querySelectorAll("script");
    for (let script of scripts) {
      script.remove();
    }
  };

  // Is attribute dangerous?
  const isAttributeDangerous = function (name, value) {
    let val = value.replace(/\s+/g, "").toLowerCase();
    if (["src", "href", "xlink:href"].includes(name)) {
      if (val.includes("javascript:") || val.includes("data:")) {
        return true;
      }
    }
    if (name.startsWith("on")) {
      return true;
    }
  };

  // Remove dangerous attributes from an HTML element
  const removeAttributes = function (elem) {
    let attributes = elem.attributes;
    for (let { name, value } of attributes) {
      if (!isAttributeDangerous(name, value)) {
        continue;
      }
      elem.removeAttribute(name);
    }
  };

  // Remove dangerous code and attributes from HTML
  const cleanHTML = function (html) {
    let nodes = html.children;
    for (let node of nodes) {
      removeAttributes(node);
      cleanHTML(node);
    }
  };

  // Convert input string to HTML
  let html = stringToHTML(value);

  // Sanititze the HTML
  removeScript(html);
  cleanHTML(html);

  // Check if we need to return it as a String
  if (args.includes("text")) {
    el.innerText = html.innerHTML;
  } else {
    el.innerHTML = html.innerHTML;
  }
};

/**
 * Safe HTML Directive
 */
export const safehtml = {
  bind: directive,
};
