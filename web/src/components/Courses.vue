<template>
  <div>
    <AppBar />

    <div v-for="course in courses" :key="course.name">
      <v-card class="mx-auto my-6" width="700">
        <v-row align="center">
          <v-col>
            <v-card-title>{{ course.name }}</v-card-title>
            <v-icon class="mx-3">mdi-account</v-icon>
          </v-col>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <router-link to="viewcourse">
                <v-btn rounded text color="blue accent-4">
                  Go to Course
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import AppBar from './layout/AppBar.vue';

export default {
  name: 'Courses',
  components: {
    AppBar: AppBar,
  },
  data() {
    return {
      courses: [
        {
          name: 'Lab Kursi',
        },
        {
          name: 'Zhvillimi Dhe Dizajnimi i Uebit',
        },
        {
          name: 'Ueb Multimedia',
        },
        {
          name: 'Sistemet e Nderlidhura',
        },
        {
          name: 'Rrjetet Wireless',
        },
      ],
    };
  },
};
</script>
