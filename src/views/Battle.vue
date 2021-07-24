<template>
  <div class="d-flex flex-column pa-10">
    <v-dialog v-model="explanationModalShow" persistent max-width="500">
      <div class="pa-5 white">
        <p class="text-center">■ ルール説明 ■</p>
        <p>①：ヒーローとヴィラン（チーム）で戦いをおこないます。</p>
        <p>②：じゃんけんに勝つと勝った側のキャラクターのステータス値が1.2倍加算されます。</p>
        <p>
          ③：両者のキャラクターのステータス値を比較し、その数値が高いキャラクターの勝利となります。
        </p>
        <p>
          ※チーム戦では① 〜 ③の繰り返しで勝った試合の数で、勝敗が決まります。<br />あいこの場合はヴィランがじゃんけんで勝ったこととします。
        </p>
        <v-btn @click="explanationModalShow = !explanationModalShow" class="d-flex col-8 mx-auto"
          >わかりました</v-btn
        >
      </div>
    </v-dialog>

    <v-dialog v-model="resultModalShow" persistent max-width="500">
      <v-card class="pa-5">
        <v-card-title class="headline justify-center">
          勝ち
        </v-card-title>
        <v-card-actions>
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
        <v-btn @click="toTop" class="d-block mx-auto">トップに戻る</v-btn>
      </v-card>
    </v-dialog>

    <!-- selected-heros（キャラ選択で選択したヴィランをここに表示したい）
    （herotypesやバトルモード等は設定ストアで管理してもよい）
    -->

    <div class="wrapper d-flex mt-10">
      <hero :showBarChart="true" :hero="currentHero" />
      <p class="mx-10" style="transform:translateY(20%);">VS</p>
      <hero :showBarChart="true" :hero="currentVillain" />
    </div>

    <div class="d-flex mt-10">
      <Janken @submit="heroJankenSelected" :key="'hero' + battleIndex" />
      <!-- // $refs: コンポーネントのメソッドにアクセスできる -->
      <!-- 仮で'villain' ▶︎ 対象のコンポーネント全体を指す -->
      <Janken
        @submit="villainJankenSelected"
        :showStopButton="false"
        ref="villain"
        :key="'villain' + battleIndex"
        class="pl-10"
      />
    </div>

    <div class="d-flex mt-5 mx-auto">
      <selected-heros
        :characterType="heroTypes.hero"
        :selectedHeros="selectedHerosFromCharacterType(heroTypes.hero)"
        :heroWinCount="heroWinCount"
        :showWinCount="true"
      />
      <selected-heros
        :characterType="heroTypes.villain"
        :selectedHeros="selectedHerosFromCharacterType(heroTypes.villain)"
        :villainWinCount="villainWinCount"
        :showWinCount="true"
        class="ml-10"
      />
    </div>
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
      showWinCount: false,
      villainWinFlag: false,
      resultModalShow: false,
      explanationModalShow: false
    };
  },
  mounted() {
    this.explanationModalShow = true;
  },
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

      const heroTotal = this.currentHero.totalStats + this.currentHero.powerUp;
      const villainTotal = this.currentVillain.totalStats + this.currentVillain.powerUp;

      if (heroTotal > villainTotal) {
        this.currentHero.winner = true;
        this.currentVillain.loser = true;
        this.heroWinCount++;
        console.log("heroWinCount:", this.heroWinCount);
      }
      if (heroTotal < villainTotal) {
        this.currentVillain.winner = true;
        this.currentHero.loser = true;
        this.villainWinCount++;
        console.log("villainWinCount:", this.villainWinCount);
      }
      if (heroTotal === villainTotal) {
        this.currentVillain.winner = true;
        this.currentHero.loser = true;
        this.villainWinCount++;
      }
      if (this.battleIndex === this.battleCount - 1) {
        setTimeout(() => {
          this.resultModalShow = true;
        }, 1500);
        return;
      }
      setTimeout(() => {
        this.battleIndex++;
      }, 3000);
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

<style scoped>
.is-winner {
  background: yellow;
}

.is-loser {
  background: purple;
}
</style>
