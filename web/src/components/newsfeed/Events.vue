<template>
	<div class="my-4 d-flex ml-5">
		<v-card width="260">
			<v-card-title>Events</v-card-title>
			<v-card-text>Hi {{ user.username }} </v-card-text>
		</v-card>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters(["user"])
		}
	};
</script>

<style></style>
