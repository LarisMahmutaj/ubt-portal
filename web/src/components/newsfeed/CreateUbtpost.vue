<template>
	<div class="d-flex flex-nowrap justify-center ">
		<div class="d-flex justify-center ">
			<v-card class="mx-auto my-4 " style="width:550px" max-width="550">
				<v-form @submit.prevent="onSubmit">
					<v-card flat
						><v-card-text v-if="showInfo"
							># for h1 Heading <br />** for bold text <br />
							* for italic text <br />
							`` for inline code <br />
							``` " " for block code<br />
							```language-name "code here" ```
						</v-card-text></v-card
					>
					<v-textarea
						placeholder="Whats happening?"
						flat
						hide-details
						rounded
						auto-grow
						rows="4"
						row-height="25"
						v-model="ubtpost.content"
						append-icon="mdi-information-outline"
						@click:append="showInfo = !showInfo"
					>
					</v-textarea>

					<div class="buttons">
						<div>
							<v-btn depressed icon class="mx-2 my-2"
								><v-icon>add_photo_alternate</v-icon></v-btn
							>
							<v-btn icon depressed class="my-2"
								><v-icon>attach_file</v-icon></v-btn
							>
						</div>
						<v-btn
							type="submit"
							small
							depressed
							class="mx-4"
							rounded
							dark
							color="#244082"
							>Post</v-btn
						>
					</div>
				</v-form>
			</v-card>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";

	export default {
		name: "createubtposts",
		data() {
			return {
				ubtpost: {
					content: "",
					date: null,
					authorId: null
				},
				showInfo: false
			};
		},
		computed: {
			...mapGetters(["user"])
		},
		methods: {
			...mapActions(["createUbtpost", "fetchUbtposts"]),

			async onSubmit() {
				// const response = await axios.post(
				//   "http://localhost:3000/ubtposts",
				//   this.ubtpost
				// );
				// console.log(response.data);
				var newPost = { ...this.ubtpost };
				newPost.date = new Date();
				newPost.authorId = this.user.userId;

				await this.createUbtpost(newPost);
				this.ubtpost.content = "";
				this.ubtpost.date = null;
				await this.fetchUbtposts();
			}
		}
	};
</script>

<style>
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
