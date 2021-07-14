<template>
  <div>
    <h1>{{ characterType }}</h1>
    <ul class="listFrame listFrame--02 wrapper">
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
    selectedHeros: { type: Array, require: true }
  },
  methods: {}
};
</script>

<style scoped>
h1 {
  padding: 16px;
}

.listFrame--02 {
  display: flex;
}

.hero--selected {
  max-width: 150px;
  width: 100%;
}

.listItem--selected-hero {
  width: 10%;
}
</style>
