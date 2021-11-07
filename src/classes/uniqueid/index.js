import Vue from "vue";
import { UniqueId } from "./unique-id.js";

function install(Vue, options) {
  Vue.prototype.$uniqueId = new UniqueId(options);
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
