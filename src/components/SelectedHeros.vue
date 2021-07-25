<template>
  <div class="mx-auto">
    <p class="ma-0 text-center">{{ characterTypeJa }}チーム</p>
    <div v-if="showWinCount">
      <p class="text-center">勝ち数：{{ heroWinCount }}{{ villainWinCount }}</p>
    </div>
    <ul class="listFrame--02 wrapper pl-0 mx-auto">
      <li
        class="card listItem--selected-hero"
        v-for="hero in selectedHeros"
        :key="hero.id + '-' + hero.characterType"
      >
        <hero
          :hero="hero"
          :showName="false"
          :class="{ winner: hero.winner, loser: hero.loser }"
        ></hero>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hero from "@/components/Hero.vue";
export default {
  name: "SelectedHeros",
  components: {
    Hero
  },
  data() {
    return {};
  },
  props: {
    characterType: { type: String, require: true },
    selectedHeros: { type: Array, require: true },
    heroWinCount: { type: Number, require: true },
    villainWinCount: { type: Number, require: true },
    showWinCount: { type: Boolean, require: true }
  },
  computed: {
    characterTypeJa() {
      if (this.characterType === "hero") {
        return "ヒーロー";
      }
      if (this.characterType === "villain") {
        return "ヴィラン";
      }
    }
  }
};
</script>

<style scoped>
h1 {
  padding: 16px;
}

.listFrame--02 {
  display: flex;
}

.listItem--selected-hero {
  width: 8vw;
  height: auto;
  /* max-height: 120px; */
  object-fit: cover;
}

.card:not(:first-of-type) {
  margin-left: 10px;
}
</style>
