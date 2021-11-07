import Vue from "vue";
import { GeoLocation } from "./geo-location.js";

function install(Vue, options) {
  Vue.prototype.$geo = new GeoLocation(options);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
