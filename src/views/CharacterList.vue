<template>
  <div class="wrapper mt-5">
    <p class="text-h5">キャラクター一覧</p>
    <p>キャラクターの詳細情報を確認できます。</p>
    <heroTable :headers="headers" :heroes="heroes" @rowClick="onRowClick" />
    <v-dialog v-model="showDetailModal" :max-width="400">
      <v-card>
        <hero :hero="selectedHero" :showDetail="true" />
        <v-btn block @click="closeDetailModal" class="mt-0">閉じる</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import allHeroes from "@/assets/all.json";
import Hero from "@/components/Hero.vue";
import HeroTable from "@/components/HeroTable.vue";

export default {
  name: "CharacterList",
  components: {
    HeroTable,
    Hero
  },
  data() {
    return {
      allHeroes: allHeroes,
      showDetailModal: false,
      selectedHero: {}
    };
  },
  computed: {
    headers() {
      return [
        { text: "アイコン", value: "image" },
        { text: "名前", value: "name", width: "20%" },
        { text: "ステータス値", value: "power" },
        { text: "出版社", value: "publisher" },
        { text: " ", value: "embrem" }
      ];
    },
    heroes() {
      return this.allHeroes.map(hero => {
        return {
          id: hero.id,
          name: hero.name,
          power:
            hero.powerstats.intelligence +
            hero.powerstats.strength +
            hero.powerstats.speed +
            hero.powerstats.durability +
            hero.powerstats.power +
            hero.powerstats.combat,
          publisher: hero.biography.publisher,
          image: hero.images.sm,
          embrem: this.getEmbrem(hero.biography.publisher)
        };
      });
    },
    allPub() {
      // 重複を消す
      return Array.from(new Set(this.allHeroes.map(hero => hero.biography.publisher)));
    },
    allPubCount() {
      const x = this.allPub.map(pub => {
        return {
          pubName: pub,
          count: this.allHeroes.filter(hero => hero.biography.publisher === pub).length
        };
      });
      return x.sort((a, b) => b.count - a.count);
    }
  },
  methods: {
    onRowClick(heroId) {
      this.selectedHero = this.allHeroes.find(hero => hero.id === heroId);
      console.log(this.selectedHero);
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
    },
    getEmbrem(publisherName) {
      if (
        publisherName === "Marvel Comics" ||
        publisherName === "Anti Venom" ||
        publisherName === "Angel" ||
        publisherName === "Evil Deadpool" ||
        publisherName === "Deadpool" ||
        publisherName === "Anti-Vision" ||
        publisherName === "Ant-Man" ||
        publisherName === "Archangel" ||
        publisherName === "Rune King Thor"
      ) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2880px-Marvel_Logo.svg.png";
      }
      if (
        publisherName === "DC Comics" ||
        publisherName === "Oracle" ||
        publisherName === "Spoiler" ||
        publisherName === "Nightwing"
      ) {
        return "https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg";
      }
      if (publisherName === "Dark Horse Comics") {
        return "https://www.seekpng.com/png/full/40-404080_dark-horse-wide-dark-horse-comics-logo-png.png";
      }
      return;
    }
  }
};
</script>

<style></style>
