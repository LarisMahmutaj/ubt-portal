<template>
  <v-card class="mx-auto my-5" color="#FCFCFC" max-width="550">
    <v-list color="transparent" class="d-flex justify-between py-0">
      <v-card-text class="caption">
        {{ moment(ubtpost.date).calendar() }}
      </v-card-text>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon light v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <v-list class="py-0 ma-0">
            <v-list-item class="px-0  mb-n3">
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
                        color="blue darken-1"
                        text
                        type="submit"
                        @click="editDialog = false"
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

                    <v-btn color="error darken-1" text @click="deletePost">
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
      <vue-markdown>{{ ubtpost.content }}</vue-markdown>
    </v-card-text>

    <v-card-actions>
      <v-list-item small class="grow">
        <v-list-item-content>
          <v-list-item-title class="caption">Evan You</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-btn icon depressed color="#244082"
            ><v-icon class="mr-0" color="#244082">mdi-heart</v-icon></v-btn
          >
          <span class="subheading mr-2 indigo--text">256</span>
          <span class="mr-1"> </span>
          <v-btn depressed icon color="blue-grey lighten-1">
            <v-icon color="blue-grey lighten-1" class="mr-0"
              >insert_comment</v-icon
            ></v-btn
          >
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import VueMarkdown from 'vue-markdown';

export default {
  data() {
    return {
      editDialog: false,
      deleteDialog: false,
      newPost: { ...this.ubtpost },
    };
  },
  name: 'Ubtpost',
  props: ['ubtpost'],
  components: {
    VueMarkdown,
  },

  methods: {
    ...mapActions(['deleteUbtpost', 'editUbtpost']),
			deletePost() {
				this.deleteUbtpost(this.ubtpost.ubtpostId);
				this.deleteDialog = false;
				this.$router.go();
			},
			editPost() {
				this.editUbtpost(this.newPost);
				this.$router.go();
			}
		}
	};
</script>

    deletePost() {
      this.deleteUbtpost(this.ubtpost._id);
      this.deleteDialog = false;
      this.$router.go();
    },
    editPost() {
      this.editUbtpost(this.newPost);
      this.$router.go();
    },
  },
};
</script>
