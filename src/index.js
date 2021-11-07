import { DefaultTheme, MobileSafariCssFix } from "@/constants/config";
var theme = DefaultTheme;

if (localStorage.getItem("theme")) {
  theme = localStorage.getItem("theme");
}

/**
 * Mobile Safari - Listen to events on touch (:active pseudo class)
 */
if (MobileSafariCssFix) {
  document.addEventListener("touchstart", function () {}, true);
  document.documentElement.style.setProperty(
    "-webkit-tap-highlight-color",
    "rgba(0,0,0,0);"
  );
}

/**
 * Load the theme scss file on page loading
 */
let render = () => {
  import("./scss/themes/" + theme + ".scss").then(() => {
    require("./main");
  });
};

render();
