<template>
  <ul class="listFrame wrapper">
    <li class="card" v-for="hero in info" :key="hero.id">
      <hero
        :hero="hero"
        :selectable="true"
        :bookmarkable="true"
        :selected="isSelected(hero)"
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
    info: { type: Array }
    // maxSelectCount: { type: Number, default: 3 }
    // selectMode : { type: String },
  },
  computed: {
    // ...mapGetters({
    //   isSelected: "hero/isSelected" //メソッド
    // })
  },
  methods: {
    isSelected(hero) {
      // Booleanを返す
      // return this.selectedHeros.includes(id);
      console.log("calle is selected", hero);
      console.log("isSelected result=>", this.$store.getters["hero/isSelected"]({ hero, type: "villain" }));
      return this.$store.getters["hero/isSelected"]({ hero, type: "villain" });
    },
    onSelect(hero) {
      this.$emit("select", hero);
    }
  }
};
</script>

<style></style>
