<template>
  <div>
    <div v-for="hero in info" :key="hero.id">
      <hero
        :id="hero.id"
        :name="hero.name"
        :imageUrl="hero.image.url"
        :selectable="true"
        :selected="isSelected(hero.id)"
        @select="onSelect"
      ></hero>
    </div>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
export default {
  name: "HeroList",
  components: {
    Hero
  },
  data() {
    return {
      selectedHeros: []
    };
  },
  props: {
    info: { type: Array },
    mustSelectCount: { type: Number, default: 3 }
  },
  methods: {
    isSelected(id) {
      return this.selectedHeros.includes(id);
    },
    onSelect(id) {
      if (this.selectedHeros.includes(id)) {
        this.selectedHeros = this.selectedHeros.filter(selectedId => selectedId !== id);
      } else {
        if (this.selectedHeros.length === this.mustSelectCount) {
          alert("これ以上選べません");
        } else {
          this.selectedHeros.push(id);
        }
      }
    }
  }
};
</script>

<style></style>
