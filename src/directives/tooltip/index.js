import Vue from "vue";
import { tooltip } from "./tooltip";

function install(Vue) {
  Vue.directive("tooltip", tooltip);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
