import Vue from "vue";
import { first } from "./first";

function install(Vue) {
  Vue.filter("first", first);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
