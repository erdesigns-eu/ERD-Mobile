import Vue from "vue";
import { readMore } from "./readmore";

function install(Vue) {
  Vue.filter("readMore", readMore);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
