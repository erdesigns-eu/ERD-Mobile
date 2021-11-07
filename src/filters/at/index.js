import Vue from "vue";
import { at } from "./at";

function install(Vue) {
  Vue.filter("at", at);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
