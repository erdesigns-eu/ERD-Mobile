import Vue from "vue";
import { max } from "./max";

function install(Vue) {
  Vue.filter("max", max);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
