import Vue from "vue";
import { get } from "./get";

function install(Vue) {
  Vue.filter("get", get);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
