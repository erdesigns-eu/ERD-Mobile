import Vue from "vue";
import { last } from "./last";

function install(Vue) {
  Vue.filter("last", last);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
