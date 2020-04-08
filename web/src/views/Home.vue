<template>
  <div>
    <AppBar />
    <v-container>
      <div v-for="u in ubtposts" :key="u._id">
        <Ubtpost :ubtpost="u" />
      </div>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import AppBar from "../components/layout/AppBar";
import Ubtpost from "../components/newsfeed/Ubtpost";

export default {
  data() {
    return {
      ubtposts: [],
    };
  },
  name: "Home",
  components: {
    AppBar: AppBar,
    Ubtpost: Ubtpost,
  },
  async created() {
    const response = await axios.get("http://localhost:3000/ubtposts");
    this.ubtposts = response.data;
    console.log(this.ubtposts);
  },
};
</script>
