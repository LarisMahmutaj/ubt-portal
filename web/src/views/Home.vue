<template>
  <div v-if="loggedIn">
    <NavBar />

    <v-container class="d-flex justify-center align-start">
      <SideMenu />
      <div>
        <CreateUbtpost :courseId="null" />
        <div v-for="u in allUbtposts" :key="u.postId">
          <Ubtpost :ubtpost="u" />
        </div>
      </div>
      <Events />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import NavBar from '../components/layout/NavBar';
import Ubtpost from '../components/newsfeed/Ubtpost';
import CreateUbtpost from '../components/newsfeed/CreateUbtpost';
import Events from '../components/newsfeed/Events';

//
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
    };
  },

  name: 'Home',
  computed: {
    ...mapGetters(['allUbtposts', 'loggedIn', 'app']),
  },
  components: {
    NavBar: NavBar,
    Ubtpost: Ubtpost,
    CreateUbtpost: CreateUbtpost,
    Events: Events,
  },
  beforeMount() {
    this.fetchUbtposts();
  },
  methods: {
    ...mapActions(['fetchUbtposts', 'fetchCoursePosts', 'logout']),

    async courses() {
      this.$router.push({ name: 'courses' });
    },
  },
};
</script>

<style scoped></style>
