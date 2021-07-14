<template>
  <div>
    <p>キャラクタ一覧ページ</p>

    <heroTable :headers="headers" :heroes="heroes" />
  </div>
</template>

<script>
import allHeroes from "@/assets/all.json";
import HeroTable from "@/components/HeroTable.vue";

export default {
  name: "CharacterList",
  components: {
    HeroTable
  },
  data() {
    return {
      allHeroes: allHeroes
    };
  },
  computed: {
    headers() {
      return [
        { text: "Name", value: "name" },
        { text: "PowerStatus", value: "power" },
        { text: "publisher", value: "publisher" },
        { text: "image", value: "image" },
      ];
    },
    heroes() {
      return this.allHeroes.map(hero => {
        return {
          name: hero.name,
          power: hero.powerstats.intelligence,
          publisher: hero.biography.publisher,
          image: hero.images.xs,
        };
      });
    }
  }
};
</script>

<style></style>
