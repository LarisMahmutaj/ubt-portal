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
		<div class="d-flex justify-center align-center" style="width: 50%">
			<v-card outlined raised max-width="550" max-height="620">
				<v-container>
					<div class="d-flex justify-between">
						<v-card-title class="title">Register With</v-card-title>
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
					<div class="d-flex justify-space-around  ">
						<v-btn depressed outlined color="primary">
							<v-icon class="mx-2 ">$vuetify.icons.custom</v-icon>
							Google</v-btn
						>

						<v-btn light depressed color="primary">
							<v-icon class="mx-2">mdi-facebook</v-icon>
							Facebook</v-btn
						>
					</div>
					<v-card-title class=" subtitle-1 font-weight-bold"
						>Or with E-mail</v-card-title
					>
					<div>
						<v-container>
							<v-form @submit.prevent="onSubmit">
								<v-text-field v-model="formData.username" label="Username">
								</v-text-field>
								<v-text-field
									v-model="formData.email"
									label="Email"
									type="email"
								>
								</v-text-field>
								<v-text-field
									v-model="formData.password"
									label="Password"
									type="password"
								>
								</v-text-field>
								<v-text-field
									v-model="formData.passwordConfirm"
									label="Confirm Password"
									type="password"
								></v-text-field>
								<v-checkbox
									label="I accept the Terms and Conditions and Privacy Policy"
									required
								></v-checkbox>
								<v-btn block color="primary" type="submit"
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
	import { mapActions } from "vuex";
	export default {
		data() {
			return {
				formData: {
					username: "",
					email: "",
					password: "",
					passwordConfirm: ""
				}
			};
		},
		methods: {
			/*eslint-disable*/
			...mapActions(["register"]),

			async onSubmit() {
				if (this.formData.password !== this.formData.passwordConfirm) {
					console.log("Passwords do not match");
				} else {
					const { passwordConfirm, ...newUser } = this.formData;
					// console.log(newUser);
					await this.register(newUser);
					this.$router.push("/");
				}
			}
		}
	};
</script>

<style></style>
