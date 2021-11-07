import Vue from "vue";
import { capitalize } from "./capitalize";

function install(Vue) {
  Vue.filter("capitalize", capitalize);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
