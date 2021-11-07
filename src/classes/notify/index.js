import Vue from "vue";
import { Notify } from "./notify.js";

function install(Vue, options) {
  Vue.prototype.$notify = new Notify(options);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
