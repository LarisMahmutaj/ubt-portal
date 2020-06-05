<template>
	<div>
		<v-app-bar app class="white" elevate-on-scroll>
			<div class="d-flex align-center justify-center mx-auto ">
				<div class="d-flex mr-12  ">
					<v-icon class="mx-3">mdi-twitter</v-icon>
					<v-toolbar-title class="mr-8">UBT Portal</v-toolbar-title>
				</div>

				<div style="width:550px;margin-top:30px;" class="mx-11">
					<v-text-field
						solo
						rounded
						label="Search"
						append-icon="search"
					></v-text-field>
				</div>

				<div class="d-flex  ml-n12">
					<v-btn class="mx-5" small icon @click="refresh">
						<v-icon appennd dark>refresh</v-icon>
					</v-btn>
					<v-btn class="mx-5" small icon>
						<v-icon appennd dark>settings</v-icon>
					</v-btn>
					<v-btn class="mx-5" small icon>
						<v-icon appennd dark>account_circle</v-icon>
					</v-btn>
					<v-btn @click="onLogout" class="mx-5" small icon>
						<v-icon appennd dark>exit_to_app</v-icon>
					</v-btn>
				</div>
			</div>
		</v-app-bar>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		data() {
			return {
				loading: false
			};
		},
		methods: {
			...mapActions(["logout", "fetchUbtposts"]),

			async onLogout() {
				await this.logout().then(() => {
					this.$router.push("/");
				});
			},

			async refresh() {
				this.loading = true;
				await this.fetchUbtposts();
				this.loading = false;
				this.$forceUpdate();
			}
		}
	};
</script>
