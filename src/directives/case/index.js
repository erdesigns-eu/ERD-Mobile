import Vue from "vue";
import { tocase } from "./case";

function install(Vue) {
  Vue.directive("case", tocase);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
