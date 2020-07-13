<template>
  <v-list rounded color="#fcfcfc">
    <v-list-item>
      <v-form
        @submit.prevent="postComment"
        class="d-flex align-end"
        style="width:100%"
      >
        <v-textarea
          class="pr-2"
          auto-grow
          rows="1"
          label="Write a comment..."
          v-model="newComment.content"
        ></v-textarea>
        <v-btn
          type="submit"
          class="mb-6"
          rounded
          color="blue darken-4"
          dark
          small
          >Post</v-btn
        >
      </v-form>
    </v-list-item>

    <v-list-item
      class="comment"
      v-for="comment in comments"
      :key="comment.commentId"
    >
      <v-list-item-content>
        <v-list-item-title
          class="d-flex justify-space-between align-center font-weight-bold"
        >
          <p class="mb-0">{{ comment.user.fullname }}</p>
          <v-btn
            v-if="comment.userId === user.userId"
            @click.stop="deleteDialog = true"
            icon
            small
          >
            <v-icon>delete</v-icon>
          </v-btn>
          <v-dialog v-model="deleteDialog" max-width="290">
            <v-card>
              <v-card-title class="headline error--text"
                >Delete Comment?</v-card-title
              >

              <v-card-text>
                Are you sure you want to delete this comment? Once deleted you
                cannot bring it back.
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="primary darken-1"
                  text
                  @click="deleteDialog = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="error darken-1"
                  text
                  @click="deleteComment(comment.commentId)"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item-title>
        {{ comment.content }}
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import {
  CREATE_POST_COMMENT,
  GET_POST_COMMENTS,
  DELETE_UBTPOST_COMMENT,
} from '../../api/comments.api';
import { mapGetters } from 'vuex';
export default {
  name: 'Comments',
  data() {
    return {
      comments: [],
      newComment: {
        content: '',
        date: null,
      },
      componentKey: 1,
      deleteDialog: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  props: ['postId'],
  async created() {
    const response = await GET_POST_COMMENTS(
      this.postId,
      this.$route.params.courseId
    );
    this.comments = response.data;
  },
  methods: {
    async postComment() {
      this.newComment.date = new Date();

      const response = await CREATE_POST_COMMENT(
        this.postId,
        this.newComment,
        this.$route.params.courseId
      );

      this.newComment.content = '';
      this.newComment.date = null;
      this.comments.push(response.data);
      this.$emit('commentPost');
    },
    async deleteComment(commentId) {
      await DELETE_UBTPOST_COMMENT(commentId, this.$route.params.courseId);
      const response = await GET_POST_COMMENTS(
        this.postId,
        this.$route.params.courseId
      );
      this.deleteDialog = false;
      this.comments = response.data;
    },
  },
};
</script>

<style scoped>
.comment {
  background-color: #e3f2fd;
}
</style>
