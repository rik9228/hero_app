<template>
  <ul class="listFrame wrapper">
    <li class="card" v-for="hero in info" :key="hero.id">
      <hero
        :id="hero.id"
        :name="hero.name"
        :imageUrl="hero.image.url"
        :selectable="true"
        :bookmarkable="true"
        :selected="isSelected(hero.id)"
        @select="onSelect"
      ></hero>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import Hero from "@/components/Hero.vue";
export default {
  name: "HeroList",
  components: {
    Hero
  },
  data() {
    return {
      // selectedHeros: []
    };
  },
  props: {
    info: { type: Array },
    maxSelectCount: { type: Number, default: 3 },
    selectMode : { type: String },
  },
  computed: {
    ...mapGetters({
      isSelected: "hero/isSelected" //メソッド
    })
  },
  methods: {
    // isSelected(id) {
    //   // Booleanを返す
    //   // return this.selectedHeros.includes(id);
    //   return this.isSelected(id);
    // },
    onSelect(id) {
      // emitで逃げたい
      const hero = this.info.find(hero=> hero.id === id);
      if (this.selectMode === 'hero') {
        this.$store.dispatch("hero/toggleHeros", { hero, limit: this.maxSelectCount });
      }
      if (this.selectMode === 'villain') {
        this.$store.dispatch("hero/toggleVillains", { hero, limit: this.maxSelectCount });
      }
    }
  }
};
</script>

<style></style>
