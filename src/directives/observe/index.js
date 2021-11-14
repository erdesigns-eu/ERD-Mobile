import Vue from "vue";
import { observe } from "./observe";

function install(Vue) {
  Vue.directive("observe", observe);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
