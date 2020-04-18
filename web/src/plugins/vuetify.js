import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Google from '../components/icons/Google.vue';
import Ubtlogo from '../components/icons/Ubtlogo.vue';
Vue.use(Vuetify);
export default new Vuetify({
  theme: {
    /**/
  },
  icons: {
    values: {
      custom: {
        // name of our custom icon
        component: Google,
        // our custom component
      },
      ubt: {
        component: Ubtlogo,
      },
    },
  },
});
