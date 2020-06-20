<template>
  <div>
    <AppBar />

    <div v-for="course in allCourses" :key="course.name">
      <v-card class="mx-auto my-6" width="700">
        <v-row align="center">
          <v-col>
            <v-card-title>{{ course.name }}</v-card-title>
            <v-icon class="mx-3">mdi-account</v-icon>
          </v-col>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="setCurrent(course.courseId)"
                rounded
                text
                color="blue accent-4"
              >
                Go to Course
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import AppBar from './layout/AppBar.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Courses',
  components: {
    AppBar: AppBar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['allCourses', 'user']),
  },
  beforeMount() {
    this.fetchCourses();
  },
  methods: {
    ...mapActions(['fetchCourses', 'setCurrentCourse', 'fetchCoursePosts']),
    async setCurrent(courseId) {
      await this.setCurrentCourse(courseId);
      this.$router.push('/course');
    },
  },
};
</script>
