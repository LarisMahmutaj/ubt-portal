import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import auth from "./store/modules/auth"
import vuetify from "./plugins/vuetify"
import VueRouter from "vue-router"
import { routes } from "./routes"
import moment from "moment"
import Axios from "axios"
import Vuelidate from "vuelidate"
Vue.use(Vuelidate)

Vue.prototype.moment = moment
Vue.prototype.$http = Axios
const access_token = localStorage.getItem("access_token")
if (access_token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = access_token
}

Vue.use(moment)
Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
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
  auth,
  store,
  router,
  render: (h) => h(App),
})
