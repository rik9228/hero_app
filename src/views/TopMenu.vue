<template>
  <section class="top">
    <div class="top__wrapper wrapper">
      <h2 class="top__title">ヒーロー対戦アプリ</h2>
      <v-btn depressed color="primary" :to="{ name: 'VSmode' }">
        キャラクター選択へ
      </v-btn>
      <v-btn depressed color="warning" :to="{ name: 'CharacterList' }">
        キャラクターリストへ
      </v-btn>
    </div>
  </section>
</template>

<script>
export default {
  name: "TopMenu"
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
