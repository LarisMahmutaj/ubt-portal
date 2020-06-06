<template>
	<div class="container">
		<div class="content">
			<v-img class="image" src="../assets/images/confirmed.svg"></v-img>
			<h1>Email Confirmed</h1>
			<v-btn class="login-btn" color="#6c63ff" dark to="/" width="100px"
				>Login</v-btn
			>
		</div>
	</div>
</template>

<script>
	export default {
		name: "EmailConfirmed"
	};
</script>

<style scoped>
	.container {
		color: white;
		margin: 0;
		padding: 0;
		min-width: 100%;
		min-height: 100vh;
		background-color: #185bde;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.image {
		width: 500px;
	}

	h1 {
		font-size: 25pt;
		margin: 20px 0 10px 0;
	}
</style>