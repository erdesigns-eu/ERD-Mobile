import Vue from "vue";
import { Device } from "./device.js";

function install(Vue, options) {
  Vue.prototype.$device = new Device(options);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
