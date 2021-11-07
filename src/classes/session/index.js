import Vue from "vue";
import { Session } from "./session.js";

function install(Vue, options) {
  Vue.prototype.$session = new Session(options);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
