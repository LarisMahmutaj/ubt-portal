<template>
  <div>
    <div v-for="course in courses" :key="course.courseId">
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
                @click="goToCourse(course.courseId)"
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
import { GET_JOINED_COURSES } from '../../api/courses.api';
export default {
  name: 'JoinedCourses',
  components: {},
  data() {
    return {
      courses: [],
    };
  },

  async beforeMount() {
    const response = await GET_JOINED_COURSES();
    this.courses = response.data;
  },
  methods: {
    async goToCourse(courseId) {
      this.$router.push({ name: 'course', params: { courseId } });
    },
  },
};
</script>
