import Vue from "vue";
import { readingTime, readingTimeFromId } from "./readingtime";

function install(Vue, options) {
  if (options && options.fromId === true) {
    Vue.filter("readingTime", readingTimeFromId);
  } else {
    Vue.filter("readingTime", readingTime);
  }
}

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  install(window.Vue);
}

export default install;
