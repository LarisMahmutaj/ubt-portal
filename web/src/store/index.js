import Vue from "vue";
import Vuex from "vuex";
import ubtposts from "./modules/ubtposts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ubtposts
  }
});
