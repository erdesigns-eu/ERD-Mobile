const directive = (el, binding) => {
  el.addEventListener(
    "click",
    function (e) {
      // Set properties
      el.style.setProperty("position", "relative");
      el.style.setProperty("overflow", "hidden");
      el.style.setProperty("animation-play-state", "paused");

      // Arguments as array
      const args = binding.arg
        ? binding.arg.split(":").map((arg) => arg.toLowerCase())
        : [];

      // Create ripple element
      const circle = document.createElement("span");
      const diameter = Math.max(el.clientWidth, el.clientHeight);
      const radius = diameter / 2;
      const rect = e.target.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("vue-ripples");

      // Custom ripple color
      if (binding.value && typeof binding.value === "string") {
        circle.style.backgroundColor = binding.value;
      }

      // Square ripple
      if (args.includes("square")) {
        circle.style.borderRadius = 0;
      }
      // Dark ripple
      if (args.includes("dark")) {
        circle.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      }
      // Light ripple
      if (args.includes("light")) {
        circle.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      }

      // Add event listener to listen when the animation ended
      // so we can remove the ripple element and the properties
      // we added to the element.
      circle.addEventListener(
        "animationend",
        function () {
          circle.parentNode.removeChild(circle);
          if (el.getElementsByClassName("vue-ripples").length === 0) {
            el.style.removeProperty("position");
            el.style.removeProperty("overflow");
            el.style.removeProperty("animation-play-state");
          }
        },
        { once: true }
      );

      // Append ripple to element
      el.appendChild(circle);
    },
    false
  );
};

/**
 * Ripples Directive
 */
export const ripples = {
  bind: directive,
};
