<template>
	<div>
		<AppBar />
		<v-container>
			<div>
				<CreateUbtpost />
				<div v-for="u in allUbtposts" :key="u._id">
					<Ubtpost :ubtpost="u" />
				</div>
			</div>
		</v-container>
	</div>
</template>

<script>
	// @ is an alias to /src
	import { mapGetters, mapActions } from "vuex";
	import AppBar from "../components/layout/AppBar";
	import Ubtpost from "../components/newsfeed/Ubtpost";
	import CreateUbtpost from "../components/newsfeed/CreateUbtpost";
	//
	export default {
		data() {
			return {
				ubtposts: []
			};
		},
		name: "Home",
		computed: {
			...mapGetters(["allUbtposts"])
		},
		components: {
			AppBar: AppBar,
			Ubtpost: Ubtpost,
			CreateUbtpost: CreateUbtpost
		},
		created() {
			this.fetchUbtposts();
		},
		methods: {
			...mapActions(["fetchUbtposts"])
		}
	};
</script>
