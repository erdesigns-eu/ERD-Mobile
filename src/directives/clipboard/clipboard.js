/**
 * Clipboard Directive
 */
export const clipboard = {
  bind: async function (el, binding) {
    var text = binding.value;
    if (!binding.value || !binding.value.length) {
      text = el.textContent;
    }
    el.addEventListener("click", function () {
      if (el.style) {
        el.style.cursor = "pointer";
      }
      if ("clipboard" in navigator) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          let result = document.execCommand("copy");
          document.body.removeChild(textarea);
          return result;
        } catch {
          return false;
        }
      }
    });
  },
};
