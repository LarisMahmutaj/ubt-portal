<template>
  <div class="d-flex flex-column flex-lg-row">
    <div>
      <v-img
        position="left"
        max-height="100vh"
        max-width="1070"
        src="../assets/images/stud4.jpg"
      ></v-img>
    </div>
    <div class="d-flex justify-center align-center" style="width: 50%">
      <v-card outlined raised max-width="550">
        <v-container>
          <div class="d-flex justify-between">
            <v-card-title class="font-weight-bold"
              >Sign in to Continue</v-card-title
            >
            <v-spacer></v-spacer>
            <v-card-title class="caption "
              >Don't have an account?
              <v-subtitle class="mx-1 primary--text font-weight-bold"
                >Register</v-subtitle
              ></v-card-title
            >
          </div>
          <div>
            <v-container>
              <v-form>
                <v-text-field label="Username" required></v-text-field>
                <v-text-field
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn block color="primary">Log IN</v-btn>
              </v-form>
              <div class="py-5 d-flex justify-start">
                <v-title class="font-weight-bold">Or sign in with</v-title>
              </div>
              <div class="d-flex justify-space-around">
                <v-btn class="mx-1"
                  ><v-icon>$vuetify.icons.custom</v-icon>Google</v-btn
                >
                <v-btn color="primary">
                  <v-icon class="mx-1">mdi-facebook</v-icon>
                  Facebook</v-btn
                >
              </div>
            </v-container>
          </div>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>

<style></style>
