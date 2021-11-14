import Vue from "vue";
import { lazyload } from "./lazyload";

function install(Vue) {
  Vue.directive("lazy-load", lazyload);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
