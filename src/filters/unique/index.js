import Vue from "vue";
import { unique } from "./unique";

function install(Vue) {
  Vue.filter("unique", unique);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
