<template>
  <div class="d-flex flex-nowrap justify-center ">
    <NavBar />

    <v-container class="d-flex justify-center align-start">
      <div style="width:280px;">
        <v-btn
          @click="home"
          text
          rounded
          class="justify-start font-size-15 mb-4 "
          ><v-icon class="mx-3">mdi-home</v-icon>Home</v-btn
        >

        <v-btn text rounded class="justify-start font-size-15 mb-4"
          ><v-icon class="mx-3">mdi-bell-outline</v-icon>Notification</v-btn
        >
        <v-btn text rounded class="justify-start font-size-15 mb-4">
          <v-icon class="mx-3">mdi-message-outline</v-icon>Messages</v-btn
        >

        <v-btn
          text
          rounded
          class="justify-start font-size-15 mb-4"
          @click="courses"
        >
          <v-icon class="mx-3">mdi-account-group</v-icon>

          Courses</v-btn
        >
      </div>
      <div class="d-flex justify-center flex-column">
        <h3 class="mt-2">{{ currentCourse.name }}</h3>

        <img
          src="../../assets/images/coursescover.png"
          alt=""
          style="width:550px;heigth:180px;border-radius:5px;"
        />

        <CreateUbtpost :courseId="currentCourse.courseId" />
        <div v-for="u in allCoursePosts" :key="u.postId">
          <Ubtpost :ubtpost="u" />
        </div>
      </div>
      <div class="my-4 d-flex ml-5">
        <v-card width="260">
          <v-card-title>Course</v-card-title>
          <div class="overline mx-4 mb-2">Search in this course</div>
          <v-text-field
            placeholder="Search"
            clearable
            outlined
            dense
            append-icon="search"
            style="width:240px;"
            class="d-flex justify-center mx-auto"
          ></v-text-field>
          <v-spacer></v-spacer>
          <div class="overline mx-4 mb-2">Invite Members</div>
          <v-text-field
            placeholder="Invite"
            clearable
            outlined
            dense
            append-icon="search"
            style="width:240px;"
            class="d-flex justify-center mx-auto"
          ></v-text-field>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import NavBar from '../../components/layout/NavBar';
import Ubtpost from '../../components/newsfeed/Ubtpost';
import CreateUbtpost from '../../components/newsfeed/CreateUbtpost';

export default {
  data() {
    return {};
  },
  name: 'Course',
  computed: {
    ...mapGetters([
      'allCoursePosts',
      'loggedIn',
      'currentCourse',
      'user',
      'allUbtposts',
    ]),
  },
  components: {
    NavBar: NavBar,
    Ubtpost: Ubtpost,
    CreateUbtpost: CreateUbtpost,
  },
  async beforeMount() {
    await this.fetchCoursePosts(this.$route.params.courseId);
  },
  methods: {
    ...mapActions([
      'fetchUbtposts',
      'fetchCoursePosts',
      'logout',
      'setCurrentCourse',
    ]),

    async courses() {
      this.$router.push({ name: 'courses' });
    },
    async home() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style></style>
