import Vue from "vue";
import { min } from "./min";

function install(Vue) {
  Vue.filter("min", min);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
