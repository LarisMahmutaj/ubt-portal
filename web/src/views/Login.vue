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
    <div
      class="d-flex flex-column justify-center align-center"
      style="width: 50%"
    >
      <v-alert v-if="error" type="info"
        >{{ error }}
        <v-btn icon @click="clearError"
          ><v-icon>mdi-close-circle</v-icon></v-btn
        ></v-alert
      >

      <v-card outlined raised max-width="550">
        <v-container>
          <div class="d-flex justify-between">
            <v-card-title class="font-weight-bold"
              >Sign in to Continue</v-card-title
            >
            <v-spacer></v-spacer>
            <v-card-title class="caption "
              >Don't have an account?
              <v-card-subtitle class="primary--text font-weight-bold">
                <router-link to="/register"
                  >Register</router-link
                ></v-card-subtitle
              ></v-card-title
            >
          </div>
          <div>
            <v-container>
              <v-form @submit.prevent="onSubmit">
                <v-text-field
                  hide-details
                  :class="{
                    'is-invalid': submitted && $v.formData.email.$error,
                  }"
                  v-model="formData.email"
                  label="Email"
                  required
                ></v-text-field>
                <div
                  v-if="submitted && $v.formData.email.$error"
                  class="invalid-feedback"
                >
                  <v-input
                    error
                    :error-messages="['Email is required']"
                    v-if="!$v.formData.email.required"
                  ></v-input>
                  <v-input
                    error
                    :error-messages="['Email is invalid']"
                    v-if="!$v.formData.email.email"
                  ></v-input>
                </div>
                <v-text-field
                  hide-details
                  label="Password"
                  :class="{
                    'is-invalid': submitted && $v.formData.password.$error,
                  }"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <div
                  v-if="submitted && $v.formData.password.$error"
                  class="invalid-feedback"
                >
                  <v-input
                    error
                    :error-messages="['Password is required']"
                    v-if="!$v.formData.password.required"
                  ></v-input>
                  <v-input
                    error
                    :error-messages="['Password must be at least 6 characters']"
                    v-if="!$v.formData.password.minLength"
                  ></v-input>
                </div>
                <v-btn
                  v-if="loading"
                  loading
                  type="submit"
                  class="my-2"
                  block
                  color="primary"
                  >Log In</v-btn
                >
                <v-btn v-else type="submit" class="my-6" block color="primary"
                  >Log In</v-btn
                >
              </v-form>
              <!-- <div class="d-flex justify-start mx-auto ">
                <v-card-title class="font-weight-bold subtitle-1"
                  >Or sign in with</v-card-title
                >
              </div>
              <div class="d-flex justify-space-around">
                <v-btn class="mx-1"
                  ><v-icon>$vuetify.icons.custom</v-icon>Google</v-btn
                >
                <v-btn color="primary">
                  <v-icon class="mx-1">mdi-facebook</v-icon>
                  Facebook</v-btn
                >
              </div> -->
            </v-container>
          </div>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      showPassword: false,
      submitted: false,
      loading: false,
      testError: 'Please confirm your email to login',
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  computed: {
    ...mapGetters(['loggedIn', 'error']),
  },
  methods: {
    ...mapActions(['login', 'setError']),

    async onSubmit() {
      this.loading = true;
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.loading = false;
        return;
      } else {
        try {
          await this.login(this.formData);

          this.$router.push('home');
        } catch (error) {
          this.setError(error.response.data.message);
        }
      }
      this.loading = false;
    },
    async clearError() {
      await this.setError(null);
    },
  },
};
</script>
