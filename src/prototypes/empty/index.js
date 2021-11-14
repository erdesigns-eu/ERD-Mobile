import Vue from "vue";

function install(Vue) {
  Vue.prototype.$empty = (val) =>
    val == null || val == false || !(Object.keys(val) || val).length;
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
