<template>
	<div>
		<v-app-bar flat light>
			<v-icon class="mx-4">mdi-twitter</v-icon>
			<v-toolbar-title>UBT Portal</v-toolbar-title>
			<v-spacer></v-spacer>
			<div class="mr-12">
				<v-btn class="mx-3" small icon>
					<v-icon appennd dark>create</v-icon>
				</v-btn>
				<v-btn class="mx-3" small icon>
					<v-icon appennd dark>settings</v-icon>
				</v-btn>
				<v-btn class="mx-3" small icon>
					<v-icon appennd dark>account_circle</v-icon>
				</v-btn>
				<v-btn @click="onLogout" class="mx-3" small icon>
					<v-icon appennd dark>exit_to_app</v-icon>
				</v-btn>
			</div>
		</v-app-bar>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		methods: {
			...mapActions(["logout"]),

			async onLogout() {
				await this.logout().then(() => {
					this.$router.push("/");
				});
			}
		}
	};
</script>

<style></style>
