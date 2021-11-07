import Vue from "vue";
import { Http } from "./http.js";

function install(Vue, options) {
  Vue.prototype.$http = new Http(options);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
