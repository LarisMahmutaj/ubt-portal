<template>
  <div class="d-flex flex-column flex-lg-row">
    <div>
      <v-img
        position="left"
        max-height="100vh"
        max-width="1070"
        src="../assets/images/backgroundLogin.jpg"
      ></v-img>
    </div>

    <div
      class="d-flex flex-column justify-center align-center"
      style="width: 50%"
    >
      <v-card outlined raised max-width="550" max-height="700">
        <v-container>
          <div class="d-flex justify-between">
            <v-card-title class="title">Register</v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="caption"
              >Are you a member?
              <router-link class="textDecoration-none" to="/"
                ><v-card-subtitle class=" primary--text font-weight-bold "
                  >Login</v-card-subtitle
                ></router-link
              >
            </v-card-title>
          </div>
          <!-- <div class="d-flex justify-space-around  ">
						<v-btn depressed outlined color="primary">
							<v-icon class="mx-2 ">$vuetify.icons.custom</v-icon>
							Google</v-btn
						>

						<v-btn light depressed color="primary">
							<v-icon class="mx-2">mdi-facebook</v-icon>
							Facebook</v-btn
						>
					</div>
					<v-card-title class=" subtitle-1 font-weight-bold pb-0 mb-0"
						>Or with E-mail</v-card-title
					> -->

          <div>
            <v-container>
              <v-form @submit.prevent="onSubmit">
                <v-text-field
                  class="py-0"
                  hide-details
                  :class="{
                    'is-invalid': submitted && $v.formData.fullname.$error,
                  }"
                  v-model="formData.fullname"
                  label="Fullname"
                >
                </v-text-field>
                <div
                  v-if="submitted && $v.formData.fullname.$error"
                  class="invalid-feedback"
                >
                  <v-input
                    error
                    v-if="submitted && !$v.formData.fullname.required"
                    class="invalid-feedback"
                    :error-messages="['Name is required']"
                  ></v-input>
                  <v-input
                    v-if="submitted && !$v.formData.fullname.maxLength"
                    class="invalid-feedback"
                    :error-messages="[
                      'Name must be shorter than 30 characters',
                    ]"
                  ></v-input>
                </div>
                <v-text-field
                  hide-details
                  :class="{
                    'is-invalid': submitted && $v.formData.email.$error,
                  }"
                  v-model="formData.email"
                  label="Email"
                  type="email"
                >
                </v-text-field>
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
                  :class="{
                    'is-invalid': submitted && $v.formData.password.$error,
                  }"
                  v-model="formData.password"
                  label="Password"
                  type="password"
                >
                </v-text-field>
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
                <v-text-field
                  hide-details
                  :class="{
                    'is-invalid':
                      submitted && $v.formData.passwordConfirm.$error,
                  }"
                  v-model="formData.passwordConfirm"
                  label="Confirm Password"
                  type="password"
                ></v-text-field>
                <div
                  v-if="submitted && $v.formData.passwordConfirm.$error"
                  class="invalid-feedback"
                >
                  <v-input
                    error
                    :error-messages="['Confirm Password is required']"
                    v-if="!$v.formData.passwordConfirm.required"
                  ></v-input>
                  <v-input
                    error
                    :error-messages="['Passwords must match']"
                    v-else-if="!$v.formData.passwordConfirm.sameAsPassword"
                  ></v-input>
                </div>
                <div
                  :class="{
                    'is-invalid': submitted && $v.formData.agreeToTerms.$error,
                  }"
                >
                  <v-checkbox
                    hide-details
                    max-height="20px"
                    v-model="formData.agreeToTerms"
                    label="I accept the Terms and Conditions and Privacy Policy"
                  >
                  </v-checkbox>
                </div>
                <v-btn
                  v-if="loading"
                  loading
                  class="my-2"
                  block
                  color="primary"
                  type="submit"
                  >Create Your Account</v-btn
                >
                <v-btn v-else class="my-2" block color="primary" type="submit"
                  >Create Your Account</v-btn
                >
              </v-form>
            </v-container>
          </div>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      formData: {
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: '',
        agreeToTerms: null,
      },
      submitted: false,
      loading: false,
    };
  },
  validations: {
    formData: {
      fullname: {
        required,
        maxLength: maxLength(30),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs('password'),
      },
      agreeToTerms: {
        required,
        sameAs: sameAs(() => true),
      },
    },
  },
  methods: {
    /*eslint-disable*/
    ...mapActions(['register', 'setError']),

    async onSubmit() {
      this.loading = true;
      const { ...newUser } = this.formData;
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        await this.register(newUser);
        this.loading = false;
        this.setError('Please confirm your email to login.');
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>

<style></style>
