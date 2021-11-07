import Vue from "vue";
import { contains } from "./contains";

function install(Vue) {
  Vue.filter("contains", contains);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
