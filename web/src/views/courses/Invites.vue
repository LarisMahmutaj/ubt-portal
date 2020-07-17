<template>
  <div class="d-flex justify-center py-5" :key="componentKey">
    <v-card width="40%">
      <v-card-title>Invites</v-card-title>
      <v-list>
        <v-list-item v-for="invite in invites" :key="invite.courseId">
          <v-list-item-content>
            <v-list-item-title>{{ invite.course.name }}</v-list-item-title>
            <v-list-item-subtitle>{{
              moment(invite.dateInvited).calendar()
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <div>
              <v-btn
                @click="updateInvitation(invite.courseId, false)"
                small
                color="error"
                class="mx-2"
                >Decline</v-btn
              >
              <v-btn
                @click="updateInvitation(invite.courseId, true)"
                small
                dark
                color="blue darken-4"
                >Accept</v-btn
              >
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { GET_USER_INVITES, UPDATE_INVITATION } from '../../api/courses.api';

export default {
  name: 'Invites',
  data() {
    return {
      invites: [],
      componentKey: 0,
    };
  },
  async created() {
    const response = await GET_USER_INVITES();
    this.invites = response.data;
  },
  methods: {
    async updateInvitation(courseId, accepted) {
      await UPDATE_INVITATION(courseId, { accepted });
      const response = await GET_USER_INVITES();
      this.invites = response.data;
      this.componentKey += 1;
    },
  },
};
</script>

<style></style>
