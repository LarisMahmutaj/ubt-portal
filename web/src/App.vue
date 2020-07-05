<template>
  <v-app>
    <Navbar
      v-if="this.$route.name !== 'login' && this.$route.name !== 'register'"
    />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/*eslint-disable*/
import Navbar from './components/layout/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>
