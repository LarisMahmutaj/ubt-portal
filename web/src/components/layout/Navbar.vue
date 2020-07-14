<template>
  <div>
    <v-app-bar app dark color="indigo darken-3">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex">
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
      dark
      color="indigo darken-3"
      v-model="drawer"
      floating
      app
      disable-route-watcher
    >
      <v-list>
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          color="white"
          prepend-icon="mdi-account-group"
          no-action
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-title>Courses</v-list-item-title>
          </template>
          <v-list-item to="/courses">
            <v-list-item-content>
              <v-list-item-title>Browse Courses</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/joined-courses">
            <v-list-item-content>
              <v-list-item-title>Joined Courses</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/create-course">
            <v-list-item-content>
              <v-list-item-title>Create Course</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-bell</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Invites</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-message</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Messages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style></style>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Navbar',
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
