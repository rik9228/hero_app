<template>
  <ul class="listFrame wrapper">
    <li class="card" v-for="hero in info" :key="hero.id">
      <span v-if="hero.winner">負け</span>
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
    info: { type: Array },
    selectMode : { type: String, default: 'hero' },
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
      // const fnc =this.$store.getters["hero/isSelected"];
      // fnc({ hero, type: "villain" });
      return this.$store.getters["hero/isSelected"]({ hero, type: this.selectMode });
      // ↑↑↑↑↑↑ ピュアなAPIを使っているのでcharacterTypeをつける必要がある。↑↑↑↑↑↑
      // （元のAPIにはcharacterTypeなんてものは存在しないから。コピーしたものには入っている）
    },
    onSelect(hero) {
      this.$emit("select", hero);
    }
  }
};
</script>

<style></style>
