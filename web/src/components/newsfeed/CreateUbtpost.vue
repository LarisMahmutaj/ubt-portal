<template>
  <div>
    <v-card class="mx-auto my-4" max-width="550">
      <v-form @submit.prevent="onSubmit">
        <v-textarea
          placeholder="Whats happening?"
          flat
          hide-details
          rounded
          auto-grow
          rows="4"
          row-height="25"
          v-model="ubtpost.content"
        ></v-textarea>
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
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'createubtposts',
  data() {
    return {
      ubtpost: {
        title: 'Title placeholder',
        content: '',
        date: null,
        user_id: '1528sdfsdf48',
      },
    };
  },
  methods: {
    ...mapActions(['createUbtpost']),

    onSubmit() {
      // const response = await axios.post(
      //   "http://localhost:3000/ubtposts",
      //   this.ubtpost
      // );
      // console.log(response.data);
      var newPost = { ...this.ubtpost };
      newPost.date = new Date();

      this.createUbtpost(newPost);
      this.$router.go();
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
