import Vue from "vue";
import { safehtml } from "./safehtml";

function install(Vue) {
  Vue.directive("safe-html", safehtml);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
