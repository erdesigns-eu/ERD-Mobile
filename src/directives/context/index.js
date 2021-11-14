import Vue from "vue";
import { context } from "./context";

function install(Vue) {
  Vue.directive("context", context);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
