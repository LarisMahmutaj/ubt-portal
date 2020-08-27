<template>
  <v-card
    v-if="ubtpost.author"
    class="mx-auto my-5"
    color="#FCFCFC"
    max-width="550"
    :key="componentKey"
  >
    <v-list color="transparent" class="d-flex justify-between py-0">
      <v-card-text class="body-1 font-weight-bold">
        {{ ubtpost.author.fullname }}
      </v-card-text>
      <div class="text-center" v-if="ubtpost.authorId === user.userId">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon light v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list class="py-0 ma-0">
            <v-list-item class="px-0 mb-n3">
              <!-- Edit Modal -->
              <v-dialog v-model="editDialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    class="my-0  font-weight-black"
                    text
                    block
                    small
                    v-on="on"
                  >
                    <v-icon left>mdi-pencil</v-icon>
                    Edit
                  </v-btn>
                </template>
                <v-card>
                  <v-form @submit.prevent="editPost">
                    <v-card-text>
                      <v-container>
                        <v-card-title class="px-0">
                          <span class="headline">Edit Post</span>
                        </v-card-title>
                        <v-textarea
                          placeholder="Edit post"
                          hide-details
                          auto-grow
                          autofocus
                          outlined
                          rows="4"
                          row-height="25"
                          v-model="newPost.content"
                        ></v-textarea>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="blue darken-1"
                        text
                        @click="editDialog = false"
                        >Close</v-btn
                      >
                      <v-btn
                        v-if="loading"
                        color="blue darken-1"
                        loading
                        text
                        type="submit"
                      ></v-btn>
                      <v-btn v-else color="blue darken-1" text type="submit"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-list-item>
            <v-list-item class="px-0">
              <v-dialog v-model="deleteDialog" max-width="290">
                <v-card>
                  <v-card-title class="font-weight-bold error--text"
                    >Delete Post?</v-card-title
                  >
                  <v-card-text>
                    Are you sure you want to delete this post? Once deleted you
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

                    <v-btn v-if="loading" color="error darken-1" loading text>
                      Yes
                    </v-btn>
                    <v-btn
                      v-else
                      color="error darken-1"
                      text
                      @click.prevent="deletePost"
                    >
                      Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                class="my-0 font-weight-black"
                text
                small
                color="error"
                block
                @click.stop="deleteDialog = true"
                ><v-icon left>mdi-delete</v-icon> Delete</v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-list>

    <v-card-text class="body-1 font-weight-medium">
      <vue-markdown>{{ newPost.content }}</vue-markdown>
    </v-card-text>

    <v-card-actions>
      <v-list-item small class="grow">
        <v-list-item-content>
          <v-list-item-title class="caption">
            {{ moment(newPost.date).calendar() }}</v-list-item-title
          >
        </v-list-item-content>

        <v-row align="center" justify="end">
          <div v-if="liked">
            <v-btn icon depressed color="blue darken-4" @click="unlikePost">
              <v-icon class="mr-0" color="blue darken-4"
                >mdi-heart</v-icon
              ></v-btn
            >
            <span class="subheading mr-2 blue--text text--darken-4">{{
              likes.length
            }}</span>
          </div>
          <div v-else>
            <v-btn icon depressed color="blue-grey" @click="likePost"
              ><v-icon class="mr-0" color="blue-grey">mdi-heart</v-icon></v-btn
            >
            <span class="subheading mr-2 blue-grey--text">{{
              likes.length
            }}</span>
          </div>
          <span class="mr-1"> </span>
          <v-btn depressed icon color="blue-grey lighten-1">
            <v-icon
              @click="toggleComments"
              color="blue-grey lighten-1"
              class="mr-0"
              >insert_comment</v-icon
            ></v-btn
          >
          <span class="subheading">{{ commentCount }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>

    <Comments
      v-if="showComments"
      :postId="ubtpost.postId"
      v-on:commentPost="reloadCount"
    />
  </v-card>
</template>

<script>
import Comments from './Comments';
import { mapActions, mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
import {
  GET_POST_LIKES,
  LIKE_POST,
  UNLIKE_POST,
  GET_POST_COMMENT_COUNT,
} from '../../api/ubtposts.api.js';

export default {
  data() {
    return {
      editDialog: false,
      deleteDialog: false,
      newPost: { ...this.ubtpost },
      componentKey: 0,
      loading: false,
      showComments: false,
      commentCount: 0,
      likes: [],
      liked: false,
    };
  },
  name: 'Ubtpost',
  props: ['ubtpost'],
  components: {
    VueMarkdown,
    Comments,
  },
  computed: {
    ...mapGetters(['user']),
  },
  async created() {
    const response = await GET_POST_COMMENT_COUNT(
      this.ubtpost.postId,
      this.$route.params.courseId
    );
    this.commentCount = response.data;
    this.getLikes();
  },
  methods: {
    ...mapActions([
      'deleteUbtpost',
      'editUbtpost',
      'fetchUbtposts',
      'fetchCoursePosts',
      'editCoursePost',
      'deleteCoursePost',
    ]),
    async deletePost() {
      this.loading = true;
      if (this.$route.params.courseId) {
        const courseId = this.$route.params.courseId;
        await this.deleteCoursePost({ courseId, postId: this.ubtpost.postId });
        await this.fetchCoursePosts(courseId);
      } else {
        await this.deleteUbtpost(this.ubtpost.postId);
        await this.fetchUbtposts();
      }
      this.loading = false;
      this.deleteDialog = false;
    },
    async editPost() {
      this.loading = true;
      if (this.$route.params.courseId) {
        const courseId = this.$route.params.courseId;
        await this.editCoursePost({ courseId, coursePost: this.newPost });
        await this.fetchCoursePosts(courseId);
      } else {
        await this.editUbtpost(this.newPost);
        await this.fetchUbtposts();
      }

      this.componentKey += 1;
      this.loading = false;
      this.editDialog = false;
    },
    async getLikes() {
      const response = await GET_POST_LIKES(
        this.ubtpost.postId,
        this.$route.params.courseId
      );
      this.likes = response.data;
      if (
        this.likes.filter((like) => like.userId === this.user.userId).length !==
        0
      ) {
        this.liked = true;
      }
    },
    async likePost() {
      await LIKE_POST(this.ubtpost.postId, this.$route.params.courseId);
      await this.getLikes();
    },
    async unlikePost() {
      await UNLIKE_POST(this.ubtpost.postId, this.$route.params.courseId);
      await this.getLikes();
      this.liked = false;
    },
    async toggleComments() {
      if (this.showComments) {
        this.showComments = false;
      } else {
        this.showComments = true;
      }
    },
    async reloadCount() {
      const response = await GET_POST_COMMENT_COUNT(
        this.ubtpost.postId,
        this.$route.params.courseId
      );
      this.commentCount = response.data;
    },
  },
};
</script>

<style scoped>
.comment {
  background-color: #e3f2fd;
}
</style>
