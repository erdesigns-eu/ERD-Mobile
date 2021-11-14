import Vue from "vue";
import { EventBus } from "./eventbus.js";

function install(Vue) {
  Vue.prototype.$bus = new EventBus();
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
