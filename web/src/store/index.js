import Vue from "vue";
import Vuex from "vuex";
import ubtposts from "./modules/ubtposts";
import auth from './modules/auth';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ubtposts,
    auth
  }
});
