<template>
  <v-card class="mx-auto my-4" color="#FCFCFC" max-width="550">
    <v-card-title>
      <v-icon color="blue" large left>toys</v-icon>
      <span class="title font-weight-light">{{ ubtpost.title }}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold body-1">
      {{ ubtpost.content }}
    </v-card-text>

    <v-card-actions>
      <v-list-item small class="grow">
        <v-list-item-avatar size="35" color="grey darken-3">
          <v-img
            small
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="caption">Evan You</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-btn icon depressed color="#244082"
            ><v-icon class="mr-0" color="#244082">mdi-heart</v-icon></v-btn
          >
          <span class="subheading mr-2 indigo--text">256</span>
          <span class="mr-1"> </span>
          <v-btn depressed icon color="blue-grey lighten-1">
            <v-icon color="blue-grey lighten-1" class="mr-0"
              >insert_comment</v-icon
            ></v-btn
          >
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Ubtpost",
  props: ["ubtpost"],
};
</script>

<style></style>
