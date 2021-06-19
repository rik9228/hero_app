<template>
  <ul class="listFrame wrapper">
    <h1>{{ characterType }}</h1>
    <li class="card" v-for="hero in selectedHeros" :key="hero.id + '-' + hero.characterType">
      <hero :hero="hero" :class="{ winner: hero.winner, loser: hero.loser }"></hero>
    </li>
  </ul>
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

<style>
</style>
