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
import VuePrism from "vue-prism"

import "prismjs/themes/prism-coy.css"
Vue.use(Vuelidate)
Vue.use(VuePrism)

Vue.prototype.moment = moment
Vue.prototype.$http = Axios
const access_token = localStorage.getItem("access_token")
if (access_token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = access_token
}

Vue.use(moment)

Vue.config.productionTip = false
/*eslint-disable*/
Vue.config.errorHandler = function(err, vm, info) {
  if (err.response.status === 401) {
    store.dispatch("logout")
    store.dispatch('setError', "Your session has most likely timed out.")
    router.push("/")
    
  }
}

Vue.use(VueRouter)
const router = new VueRouter({
  mode: "history",
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
