import Vue from "vue";
import { longclick } from "./longclick";

function install(Vue) {
  Vue.directive("longclick", longclick);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
