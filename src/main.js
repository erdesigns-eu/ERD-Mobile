import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

/**
 * Globally Register Components, Classes, Filters, Directives and Prototypes
 */
import "bootstrap";
import "@/components";
import "@/classes";
import "@/filters";
import "@/directives";
import "@/prototypes";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
