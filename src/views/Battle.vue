<template>
  <div>
    <p>バトル画面</p>
    <v-dialog v-model="resultModalShow" persistent>
      <v-card>
        <v-card-title class="headline">
          勝ち
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <selected-heros
            v-if="heroTeamWin"
            :characterType="heroTypes.hero"
            :selectedHeros="selectedHerosFromCharacterType(heroTypes.hero)"
          />
          <selected-heros
            v-if="!heroTeamWin"
            :characterType="heroTypes.villain"
            :selectedHeros="selectedHerosFromCharacterType(heroTypes.villain)"
          />
        </v-card-actions>
        <v-btn @click="toTop">トップに戻る</v-btn>
      </v-card>
    </v-dialog>
    <!-- selected-heros（キャラ選択で選択したヴィランをここに表示したい）
    （herotypesやバトルモード等は設定ストアで管理してもよい）
    -->
    <Janken @submit="heroJankenSelected" :key="'hero' + battleIndex" />
    <!-- // $refs: コンポーネントのメソッドにアクセスできる -->
    <!-- 仮で'villain' ▶︎ 対象のコンポーネント全体を指す -->
    <Janken
      @submit="villainJankenSelected"
      :showStopButton="false"
      ref="villain"
      :key="'villain' + battleIndex"
    />
    <hero :showBarChart="true" :hero="currentHero" />
    <hero :showBarChart="true" :hero="currentVillain" />
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
import Janken from "@/components/Janken.vue";
import Hero from "@/components/Hero.vue";

export default {
  name: "Battle",
  components: {
    SelectedHeros,
    Hero,
    Janken
  },
  props: {
    battleCount: { type: Number, required: true }
  },
  data() {
    return {
      battleIndex: 0,
      heroJanken: null,
      villainJanken: null,
      max: 1000,
      heroWinCount: 0,
      villainWinCount: 0,
      resultModalShow: false
    };
  },
  // created() {
  //   console.log("aaaaaaaaa");
  // }
  computed: {
    ...mapGetters({
      selectedHeros: "hero/selectedHeros",
      heroTypes: "hero/heroTypes",
      selectedHerosFromCharacterType: "hero/selectedHerosFromCharacterType"
    }),
    currentHero() {
      return this.selectedHerosFromCharacterType(this.heroTypes.hero)[this.battleIndex];
    },
    currentVillain() {
      return this.selectedHerosFromCharacterType(this.heroTypes.villain)[this.battleIndex];
    },
    testComputed() {
      return this.currentHero.getTotalStats();
    },
    heroTeamWin() {
      return this.heroWinCount > this.villainWinCount;
    }
  },
  methods: {
    heroJankenSelected(janken) {
      this.heroJanken = janken;
      setTimeout(() => {
        this.$refs.villain.submit();
      }, this.getRandomTime());
    },
    villainJankenSelected(janken) {
      const result = this.heroJanken.judge(janken); // じゃんけんの結果 が返ってくる
      if (result === true) {
        this.currentHero.powerUp = this.currentHero.totalStats * 0.2;
      }
      if (result === false) {
        this.currentVillain.powerUp = this.currentVillain.totalStats * 0.2;
      }
      // this.powerUpstatus.villain =this.currentVillain.totalStats * 0.2;
      const heroTotal = this.currentHero.totalStats + this.currentHero.powerUp;
      const villainTotal = this.currentVillain.totalStats + this.currentVillain.powerUp;

      if (heroTotal > villainTotal) {
        this.currentHero.winner = true;
        this.currentVillain.loser = true;
        this.heroWinCount++;
        console.log("heroWinCount:", this.heroWinCount);
        console.log("ヒーローの勝ち");
      }
      if (heroTotal < villainTotal) {
        this.currentVillain.winner = true;
        this.currentHero.loser = true;
        this.villainWinCount++;
        console.log("villainWinCount:", this.villainWinCount);
        console.log("ヴィランの勝ち");
      }
      if (heroTotal === villainTotal) {
        this.currentVillain.winner = true;
        this.currentHero.loser = true;
        this.villainWinCount++;
      }
      // this.currentHero.winner = true;
      console.log("result=>", result);
      if (this.battleIndex === this.battleCount - 1) {
        console.log("終了");
        this.resultModalShow = true;
        return;
      }
      setTimeout(() => {
        this.battleIndex++;
      }, 2000);
    },
    getRandomTime() {
      return Math.random() * this.max;
    },
    toTop() {
      this.$router.replace({ name: "TopMenu" });
    }
  }
};
</script>
