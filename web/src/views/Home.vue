<template>
	<div>
		<AppBar />
		<v-container>
			<div>
				<CreateUbtpost />
				<div v-for="u in allUbtposts" :key="u.ubtpostId">
					<Ubtpost :ubtpost="u" />
				</div>
			</div>
		</v-container>
	</div>
</template>

<script>
<<<<<<< HEAD
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import AppBar from '../components/layout/AppBar';
import Ubtpost from '../components/newsfeed/Ubtpost';
import CreateUbtpost from '../components/newsfeed/CreateUbtpost';

//
export default {
  data() {
    return {
      ubtposts: [],
    };
  },
  name: 'Home',
  computed: {
    ...mapGetters(['allUbtposts', 'loggedIn']),
  },
  components: {
    AppBar: AppBar,
    Ubtpost: Ubtpost,
    CreateUbtpost: CreateUbtpost,
  },
  created() {
    this.$forceUpdate(this.fetchUbtposts());
  },
=======
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
			...mapGetters(["allUbtposts", "loggedIn"])
		},
		components: {
			AppBar: AppBar,
			Ubtpost: Ubtpost,
			CreateUbtpost: CreateUbtpost
		},
		created() {
			this.fetchUbtposts();
		},
>>>>>>> 98a081232ed8b944f7b4662b44068c6f00f5af38

		methods: {
			...mapActions(["fetchUbtposts"])
		}
	};
</script>
