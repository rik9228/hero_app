<template>
  <v-card class="mx-auto my-12" :class="{ selected }">
    <v-progress-circular v-if="!imgLoaded" indeterminate color="primary"></v-progress-circular>
    <!-- //オリジナル画像 -->
    <v-img
      v-if="!loadError"
      @error="errorImage"
      @load="onLoad"
      class="image"
      :src="imageUrl"
      alt=""
    ></v-img>
    <!-- //デフォルト画像 -->
    <v-img
      v-if="loadError"
      @load="onLoad"
      class="image"
      src="@/assets/img_noImage@2x.png"
      alt=""
    ></v-img>

    <p>{{ name }}</p>
    <!-- <p>ID:{{ id }}</p> -->
    <div class="d-flex">
      <div v-if="selectable">
        <v-btn v-if="selected" depressed color="primary" @click="onSelect">
          解除
        </v-btn>
        <v-btn v-if="!selected" depressed color="primary" @click="onSelect">
          選択
        </v-btn>
      </div>
      <v-btn v-if="bookmarkable" depressed color="primary">
        お気に入り
      </v-btn>
    </div>
    <!-- <router-link :to="`/character/${id}`">詳細</router-link> -->
  </v-card>
  <!-- <v-img height="250" :src="image"></v-img>
    <v-card-title>{{ name }}</v-card-title>

    <v-divider class="mx-4"></v-divider> -->

  <!-- <v-card-text>
      <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text> -->

  <!-- <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions> -->
</template>

<script>
export default {
  name: "Hero",
  props: {
    id: { type: String },
    name: { type: String },
    imageUrl: { type: String },
    selectable: { type: Boolean, default: false },
    bookmarkable: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    bookmarked: { type: Boolean, default: false }
  },
  data() {
    return {
      status: [],
      isNull: false,
      imgLoaded: false,
      loadError: false
    };
  },
  methods: {
    onSelect() {
      this.$emit("select", this.id);
    },
    onLoad() {
      console.log("ロードされました");
      this.imgLoaded = true;
    },
    errorImage() {
      console.log("エラーイメージ");
      this.loadError = true;
    }
  }
  // methods: {
  //   hoge: function(data) {
  //     const stats = data.powerstats;
  //     Object.keys(stats).forEach(key => {
  //       if (stats[key] === "null") {
  //         this.isNull = true;
  //       }
  //     });
  //   }
  // },
};
</script>

<style>
* {
  list-style: none;
}

.selected {
  background: red;
}

.d-flex {
  display: flex;
  justify-content: center;
}

.wrapper {
  max-width: 960px;
  width: calc(100% - 16px * 2);
  margin: 0 auto;
}

.listFrame {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
}

.image {
  height: 266px;
  max-width: 200px;
}
</style>
