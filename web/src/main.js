import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import { routes } from "./routes";
Vue.config.productionTip = false;
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  vuetify,
  store,
  router,
  render: (h) => h(App),
});
