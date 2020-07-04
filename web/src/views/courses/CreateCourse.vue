<template>
  <div>
    <AppBar />
    <div class="d-flex flex-nowrap justify-center ">
      <div class="d-flex justify-center ">
        <v-card
          class="mx-auto my-8"
          style="width:600px"
          max-width="600"
          rounded
        >
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="course.name" label="Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                    v-model="course.description"
                      label="Description"
                      no-resize
                      rows="4"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['Private', 'Public']"
                      label="Privacy"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mx-3" rounded>Close</v-btn>
              <v-btn color="light-blue darken-4" rounded class="mx-3" type="submit">Create</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/layout/AppBar.vue";

export default {
  name: 'CreateCourse',
  components: {
    AppBar: AppBar,
  },
  data(){
    return {
      course: {
        name: '',
        description: '',
        date: null,
        ownerId: null,
        privacy: ''
      }
    }
  },
  
};
</script>
