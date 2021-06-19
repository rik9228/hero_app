<template>
  <div>
    <p>バトル画面</p>
    <!-- selected-heros（キャラ選択で選択したヴィランをここに表示したい）
    （herotypesやバトルモード等は設定ストアで管理してもよい）
    -->
    <selected-heros
      :characterType="heroTypes.hero"
      :selectedHeros="selectedHerosFromCharacterType(heroTypes.hero)"
    />
    <selected-heros
      :characterType="heroTypes.villain"
      :selectedHeros="selectedHerosFromCharacterType(heroTypes.villain)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SelectedHeros from "@/components/SelectedHeros.vue";

export default {
  name: "Battle",
  components: {
    SelectedHeros
  },
  // created() {
  //   console.log("aaaaaaaaa");
  // }
  computed: {
    ...mapGetters({
      selectedHeros: "hero/selectedHeros",
      selectedHerosFromCharacterType: "hero/selectedHerosFromCharacterType"
    })
  }
};
</script>
