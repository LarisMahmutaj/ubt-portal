<template>
  <div class="d-flex flex-nowrap justify-center ">
    <v-container class="d-flex justify-center align-start">
      <div class="d-flex justify-center flex-column">
        <div class="d-flex justify-space-between my-3">
          <h2>{{ currentCourse.name }}</h2>

          <v-dialog v-model="inviteDialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="blue darken-4" dark v-on="on">
                Invite Users<v-icon class="ml-3">person_add_alt_1</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-card-title class="px-0">
                    <span class="headline">Edit Post</span>
                  </v-card-title>
                  <v-text-field
                    label="Search Users.."
                    v-model="text"
                  ></v-text-field>
                </v-container>
                <v-list
                  transition="scroll-y-transition"
                  v-if="users && text"
                  :key="componentKey"
                >
                  <v-list-item v-for="user in users" :key="user.userId">
                    <v-list-item-content>
                      <v-list-item-title>{{ user.fullname }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        user.email
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        dark
                        color="blue darken-4"
                        @click="sendInvite(user.email)"
                        >Send Invite</v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" text @click="inviteDialog = false"
                  >Close</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <img
          src="../../assets/images/coursescover.png"
          alt=""
          style="width:550px;heigth:180px;border-radius:5px;"
        />

        <CreateUbtpost :courseId="currentCourse.courseId" />
        <div v-for="u in allCoursePosts" :key="u.postId">
          <Ubtpost :ubtpost="u" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Ubtpost from '../../components/newsfeed/Ubtpost';
import CreateUbtpost from '../../components/newsfeed/CreateUbtpost';
import { SEARCH_USERS, SEND_INVITE } from '../../api/courses.api';

export default {
  data() {
    return {
      text: '',
      users: [],
      inviteDialog: false,
      loading: false,
      componentKey: 0,
    };
  },
  watch: {
    text: function() {
      this.searchUsers();
    },
  },
  name: 'Course',
  computed: {
    ...mapGetters([
      'allCoursePosts',
      'loggedIn',
      'currentCourse',
      'user',
      'allUbtposts',
    ]),
  },
  components: {
    Ubtpost: Ubtpost,
    CreateUbtpost: CreateUbtpost,
  },
  async beforeMount() {
    await this.setCurrentCourse(this.$route.params.courseId);
    await this.fetchCoursePosts(this.$route.params.courseId);
  },
  methods: {
    ...mapActions([
      'fetchUbtposts',
      'fetchCoursePosts',
      'logout',
      'setCurrentCourse',
    ]),

    async courses() {
      this.$router.push({ name: 'courses' });
    },
    async home() {
      this.$router.push({ name: 'home' });
    },
    async searchUsers() {
      const response = await SEARCH_USERS(
        this.$route.params.courseId,
        this.text
      );
      this.users = response.data;
      this.componentKey += 1;
    },
    async sendInvite(email) {
      await SEND_INVITE(this.$route.params.courseId, email);
      this.searchUsers();
    },
  },
};
</script>

<style></style>
