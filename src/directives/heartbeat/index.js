import Vue from "vue";
import { heartbeat } from "./heartbeat";

function install(Vue) {
  Vue.directive("heartbeat", heartbeat);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
