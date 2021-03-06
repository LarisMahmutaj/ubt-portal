import Vue from 'vue';
import App from './App.vue';
import store from './store';
import auth from './store/modules/auth';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import { routes } from './routes';
import moment from 'moment';
import axios from 'axios';
import Vuelidate from 'vuelidate';
import VuePrism from 'vue-prism';

import 'prismjs/themes/prism-coy.css';
Vue.use(Vuelidate);
Vue.use(VuePrism);
Vue.prototype.moment = moment;
Vue.use(moment);
axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASEURL;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
/*eslint-disable*/
Vue.config.errorHandler = function(err, vm, info) {
  if (err.response.status === 401) {
    store.dispatch('logout');
    store.dispatch('setError', 'Your session has most likely timed out.');
    router.push('/');
  }

  if (err.response.status === 403) {
    router.push('/home');
  }
};

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.loggedIn) {
      next();
      return;
    } else {
      next('/');
    }
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  vuetify,
  auth,
  store,
  router,
  render: (h) => h(App),
});
