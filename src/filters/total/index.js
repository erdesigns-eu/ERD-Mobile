import Vue from "vue";
import { total } from "./total";

function install(Vue) {
  Vue.filter("total", total);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
