<template>
  <div>
    <v-app-bar app class="white" elevate-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex">
        <v-icon class="mx-3">mdi-twitter</v-icon>
        <v-toolbar-title class="mr-8">UBT Portal</v-toolbar-title>
      </div>

      <div class="d-flex justify-end mx-auto mr-12">
        <v-btn class="mx-5" small icon @click="refresh">
          <v-icon appennd dark>refresh</v-icon>
        </v-btn>
        <v-btn class="mx-5" small icon>
          <v-icon appennd dark>settings</v-icon>
        </v-btn>
        <v-btn class="mx-5" small icon>
          <v-icon appennd dark>account_circle</v-icon>
        </v-btn>
        <v-btn @click="onLogout" class="mx-5" small icon>
          <v-icon appennd dark>exit_to_app</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      disable-route-watcher
      clipped
    >
      <v-list absolute>
        <v-list-item>
          <router-link class="link" to="home">
            <v-icon class="mx-3 ">mdi-home</v-icon></router-link
          >
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon class="mx-3">mdi-bell-outline</v-icon>
          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          ><v-icon class="mx-3">mdi-message-outline</v-icon>
          <v-list-item-content>
            <v-list-item-title>Messages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon class="mx-3" @click="courses">mdi-account-group</v-icon>
          <v-list-item-content>
            <v-list-item-title>Courses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<style>
.link {
  text-decoration: none;
}
</style>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      drawer: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(['logout', 'fetchUbtposts', 'fetchCoursePosts']),

    async onLogout() {
      await this.logout();
      this.$router.push('/');
    },

    async refresh() {
      this.loading = true;
      await this.fetchUbtposts();
      this.loading = false;
      this.$forceUpdate();
    },
    async courses() {
      this.$router.push({ name: 'courses' });
    },
    async home() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
