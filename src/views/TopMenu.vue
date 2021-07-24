<template>
  <section class="top mt-5">
    <div class="top__wrapper wrapper">
      <h2 class="top__title">ヒーロー対戦アプリ</h2>
      <p class="text-center mt-2">好きなヒーロー同士で戦わせよう。</p>
      <v-btn color="primary" :to="{ name: 'VSmode' }">
        キャラクター選択へ
      </v-btn>
      <v-btn color="warning" :to="{ name: 'CharacterList' }">
        キャラクター一覧へ
      </v-btn>
    </div>
  </section>
</template>

<script>
import allHeroes from "@/assets/all.json";
export default {
  name: "TopMenu"
  // methods: {
  //   editJson() {
  //     var fs = require("fs");
  //     var path = require("path");

  //     var config = JSON.parse(allHeroes);
  //     console.log("config=>", config);
  //   }
  // }
};
</script>

<style>
.wrapper {
  max-width: 1000px;
  width: calc(100% - 32px * 2);
  margin: 0 auto;
}

.top__wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin-top: 32px;
}
.top__title {
  text-align: center;
}

.v-btn {
  margin-top: 32px;
}
</style>
