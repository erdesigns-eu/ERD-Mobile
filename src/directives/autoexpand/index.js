import Vue from "vue";
import { autoexpand } from "./autoexpand";

function install(Vue) {
  Vue.directive("auto-expand", autoexpand);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
