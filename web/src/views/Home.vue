<template>
	<div v-if="loggedIn">
		<AppBar />
		<v-container class="d-flex justify-center align-start">
			<div style="width:280px;">
				<v-btn text rounded class="justify-start font-size-15 mb-4 "
					><v-icon class="mx-3">mdi-home</v-icon>Home</v-btn
				>
				<v-btn text rounded class="justify-start font-size-15 mb-4"
					><v-icon class="mx-3">mdi-bell-outline</v-icon>Notification</v-btn
				>
				<v-btn text rounded class="justify-start font-size-15 mb-4">
					<v-icon class="mx-3">mdi-message-outline</v-icon>Messages</v-btn
				>
			</div>
			<div>
				<CreateUbtpost />
				<div v-for="u in allUbtposts" :key="u.ubtpostId">
					<Ubtpost :ubtpost="u" />
				</div>
			</div>
			<Events />
		</v-container>
	</div>
</template>

<script>
	// @ is an alias to /src
	import { mapGetters, mapActions } from "vuex";
	import AppBar from "../components/layout/AppBar";
	import Ubtpost from "../components/newsfeed/Ubtpost";
	import CreateUbtpost from "../components/newsfeed/CreateUbtpost";
	import Events from "../components/newsfeed/Events";

	//
	export default {
		data() {
			return {};
		},
		name: "Home",
		computed: {
			...mapGetters(["allUbtposts", "loggedIn"])
		},
		components: {
			AppBar: AppBar,
			Ubtpost: Ubtpost,
			CreateUbtpost: CreateUbtpost,
			Events: Events
		},
		created() {
			this.fetchUbtposts();
		},
		methods: {
			...mapActions(["fetchUbtposts"])
		}
	};
</script>
