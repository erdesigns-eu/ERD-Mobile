import Vue from "vue";
import { ripples } from "./ripples";

function install(Vue) {
  Vue.directive("ripples", ripples);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
