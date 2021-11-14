import Vue from "vue";
import { outside } from "./outside";

function install(Vue) {
  Vue.directive("outside", outside);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
