import Vue from 'vue';
import Vuex from 'vuex';
import ubtposts from './modules/ubtposts';
import auth from './modules/auth';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ubtposts,
    auth,
  },
  plugins: [createPersistedState()],
});
