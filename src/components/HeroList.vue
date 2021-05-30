<template>
  <ul class="listFrame wrapper">
    <li class="card" v-for="hero in info" :key="hero.id">
      <hero
        :id="hero.id"
        :name="hero.name"
        :imageUrl="hero.image.url"
        :selectable="true"
        :selected="isSelected(hero.id)"
        @select="onSelect"
      ></hero>
    </li>
  </ul>
</template>

<script>
// import { mapGetters } from 'vuex';
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
    maxSelectCount: { type: Number, default: 3 }
  },
  // computed: {
  //   ...mapGetters({
  //     selectedHeros: 'hero/selectedHeros',
  //   }),
  // },
  methods: {
    async isSelected(id) {
      // Booleanを返す
      console.log("callbase=>", id);
      var r = await this.$store.dispatch("hero/isSelected", id);
      console.log("rrr=>", r);
      return r;
    },
    onSelect(id) {
      this.$store.dispatch("hero/toggleHeros", { heroId: id, limit: this.maxSelectCount });
    }
  }
};
</script>

<style></style>
