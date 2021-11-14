import Vue from "vue";
import { clipboard } from "./clipboard";

function install(Vue) {
  Vue.directive("clipboard", clipboard);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
