<template>
  <div class="d-flex flex-nowrap justify-center ">
    <div class="d-flex justify-center ">
      <v-card class="mx-auto my-4 " style="width:550px" max-width="550">
        <v-form @submit.prevent="onSubmit">
          <v-card flat
            ><v-card-text v-if="showInfo"
              ># for h1 Heading <br />** for bold text <br />
              * for italic text <br />
              `` for inline code <br />
              ``` " " for block code<br />
              ```language-name "code here" ```
            </v-card-text></v-card
          >
          <v-textarea
            placeholder="Whats happening?"
            flat
            hide-details
            rounded
            auto-grow
            rows="4"
            row-height="25"
            v-model="ubtpost.content"
            append-icon="mdi-information-outline"
            @click:append="showInfo = !showInfo"
          >
          </v-textarea>

          <div class="buttons">
            <div>
              <v-btn depressed icon class="mx-2 my-2"
                ><v-icon>add_photo_alternate</v-icon></v-btn
              >
              <v-btn icon depressed class="my-2"
                ><v-icon>attach_file</v-icon></v-btn
              >
            </div>
            <v-btn
              v-if="loading"
              type="submit"
              small
              depressed
              loading
              class="mx-4"
              rounded
              dark
              color="#244082"
              >Post</v-btn
            >
            <v-btn
              v-else
              type="submit"
              small
              depressed
              class="mx-4"
              rounded
              dark
              color="#244082"
              >Post</v-btn
            >
          </div>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'createubtposts',
  data() {
    return {
      ubtpost: {
        content: '',
        authorId: null,
      },
      showInfo: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions([
      'createUbtpost',
      'createCoursePost',
      'fetchUbtposts',
      'fetchCoursePosts',
    ]),

    async onSubmit() {
      this.loading = true;

      if (this.$route.params.courseId) {
        const courseId = this.$route.params.courseId;
        let newPost = { ...this.ubtpost };

        newPost.authorId = this.user.userId;
        newPost.courseId = courseId;

        await this.createCoursePost({ courseId, newPost });
        await this.fetchCoursePosts(courseId);
        this.ubtpost.content = '';
      } else {
        let newPost = { ...this.ubtpost };

        newPost.authorId = this.user.userId;
        newPost.courseId = this.courseId;

        this.ubtpost.content = '';

        await this.createUbtpost(newPost);
        await this.fetchUbtposts();
      }

      this.loading = false;
    },
  },
};
</script>

<style>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
