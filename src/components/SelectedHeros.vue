<template>
  <ul class="listFrame wrapper">
    <li class="card" v-for="hero in selectedHeros" :key="hero.id">
      <hero
        :id="hero.id"
        :name="hero.name"
        :imageUrl="hero.image.url"
        :selectable="false"
      ></hero>
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
    return {
      // selectedHeros: []
    };
  },
  props: {
    maxSelectCount: { type: Number, default: 3 }
  },
  computed: {
    ...mapGetters({
      selectedHeros: "hero/selectedHeros"
    })
  },
  methods: {
  }
};
</script>

<style></style>
