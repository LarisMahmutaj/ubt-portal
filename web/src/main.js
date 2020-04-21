import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import vuetify from "./plugins/vuetify"
import VueRouter from "vue-router"
import { routes } from "./routes"
import moment from "moment"

Vue.prototype.moment = moment
Vue.use(moment)
Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  mode: "history",
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (store.getters.loggedIn) {
      next()
      return
    }

    next("/")
  } else {
    next()
  }
})

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  vuetify,
  store,
  router,
  render: (h) => h(App),
})
