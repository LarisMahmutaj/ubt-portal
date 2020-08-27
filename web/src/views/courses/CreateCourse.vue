<template>
  <div>
    <div class="d-flex flex-nowrap justify-center ">
      <div class="d-flex justify-center ">
        <v-card
          class="mx-auto my-8"
          style="width:600px"
          max-width="600"
          rounded
        >
          <v-card-title>Create Course</v-card-title>
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="course.name"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="course.description"
                      label="Description"
                      rows="1"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="course.privacy"
                      :items="items"
                      item-text="text"
                      item-value="value"
                      label="Privacy"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mx-3" rounded>Close</v-btn>
              <v-btn
                color="blue darken-4"
                rounded
                dark
                class="mx-3"
                type="submit"
                >Create</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { CREATE_COURSE } from '../../api/courses.api';

export default {
  name: 'CreateCourse',
  data() {
    return {
      course: {
        name: '',
        description: '',
        privacy: {},
      },
      items: [
        { text: 'Private', value: 'private' },
        { text: 'Public', value: 'public' },
      ],
    };
  },
  methods: {
    async onSubmit() {
      const response = await CREATE_COURSE(this.course);
      const newCourse = response.data;
      this.$router.push({
        name: 'course',
        params: { courseId: newCourse.courseId },
      });
    },
  },
};
</script>
