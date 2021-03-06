<template>
  <div class="character-select">
    <InputForm @onInput="fetchHeroes" />
    <p v-if="errorFlag" class="text-center">{{ errorValue }}</p>
    <hero-list :info="info" :selectMode="selectCharacterType" @select="onSelect" />
    <div class="selectedHero">
      <div class="selectedHeros__wrapper">
        <selected-heros
          :characterType="heroTypes.hero"
          :selectedHeros="selectedHerosFromCharacterType(heroTypes.hero)"
        />
      </div>
      <div class="selectedHeros__wrapper">
        <selected-heros
          :characterType="heroTypes.villain"
          :selectedHeros="selectedHerosFromCharacterType(heroTypes.villain)"
        />
      </div>
    </div>
    <template>
      <v-row justify="center">
        <v-dialog v-model="selectModeDialog" persistent max-width="500">
          <v-card class="pa-5">
            <v-card-title class="headline justify-center">
              バトルモードを選択してください。
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-for="selectMode in selectModeList"
                :key="selectMode.name"
                color="green darken-1 white--text"
                @click="confirmSelectMode(selectMode.name)"
                class="btn"
              >
                {{ selectMode.display }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">
              ヴィラン選択に進みますか？
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green white--text secondary" @click="heroReset">
                ヒーローを再選択
              </v-btn>
              <v-btn color="green white--text success" @click="selectVillains">
                はい
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeroList from "@/components/HeroList.vue";
import InputForm from "@/components/InputForm.vue";
import SelectedHeros from "@/components/SelectedHeros.vue";
import axios from "axios";

export default {
  name: "CharacterSelect",
  components: {
    HeroList,
    InputForm,
    SelectedHeros
  },
  data() {
    return {
      info: [],
      inputVal: "",
      errorValue: "",
      limit: 3,
      selectModeDialog: true,
      dialog: false,
      selectModeList: {
        // setting Store（設定用のストア）にいれてもよい
        oneOnOne: {
          name: "oneOnOne",
          display: "1vs1",
          hero: 1,
          villain: 1,
          battleCount: 1
        },
        threeOnThree: {
          name: "threeOnThree",
          display: "3vs3",
          hero: 3,
          villain: 3,
          battleCount: 3
        },
        fiveOnFive: {
          name: "fiveOnFive",
          display: "5vs5",
          hero: 5,
          villain: 5,
          battleCount: 5
        }
      },
      selectMode: "",
      selectCharacterType: "",
      drawer: false,
      group: null,
      errorFlag: false
    };
  },
  created() {
    this.selectCharacterType = this.heroTypes.hero;
  },
  computed: {
    ...mapGetters({
      selectedHeros: "hero/selectedHeros", //メソッド
      heroTypes: "hero/heroTypes", //メソッド
      getHeroCount: "hero/getHeroCount",
      selectedHerosFromCharacterType: "hero/selectedHerosFromCharacterType"
    }),
    maxSelectableCount() {
      return (
        this.selectModeList[this.selectMode].hero + this.selectModeList[this.selectMode].villain
      );
    }
  },
  watch: {
    // 監視
    selectedHeros() {
      if (this.getHeroCount(this.heroTypes.hero) === this.selectModeList[this.selectMode].hero) {
        if (this.selectCharacterType === this.heroTypes.hero) {
          this.dialog = true;
        }
      }
      if (this.selectedHeros.length === this.maxSelectableCount) {
        this.$router.replace({
          name: "Battle",
          params: { battleCount: this.selectModeList[this.selectMode].battleCount }
        });
      }
    },
    group() {
      this.drawer = false;
    }
  },
  methods: {
    async fetchHeroes(value) {
      this.inputVal = value;
      const arr = [];
      let result;
      try {
        result = await axios.get(
          `https://superheroapi.com/api.php/510254346771781/search/${this.inputVal}`
        );
        result.data.results.forEach(element => {
          arr.push(element);
          this.info = arr;
          this.errorValue = "";
        });
      } catch (error) {
        this.errorFlag = true;
        this.errorValue = "キャラクターが見つかりません";
        this.info = [];
      }
    },
    onSelect(hero) {
      // infoをコピー（直接書き換えることになるから）
      // console.log("■■■■■■■■■■■■■■■■■■■■■");
      // console.log("called home onSelect", hero);
      // console.log("■■■■■■■■■■■■■■■■■■■■■");
      const newHero = JSON.parse(JSON.stringify(hero));
      // オブジェクトのコピー（APIで取得したオブジェクトを直接書き換えるの避けるため）
      newHero.winner = false;
      newHero.loser = false;
      newHero.powerUp = 0;
      newHero.totalStats =
        Number(newHero.powerstats.power) +
        Number(newHero.powerstats.intelligence) +
        Number(newHero.powerstats.strength) +
        Number(newHero.powerstats.speed) +
        Number(newHero.powerstats.durability) +
        Number(newHero.powerstats.combat);
      // トータル値を返す
      newHero.characterType = this.selectCharacterType;
      this.$store.dispatch("hero/toggleHeros", { hero: newHero, limit: this.maxSelectableCount });
    },
    heroReset() {
      this.$store.dispatch("hero/initialize");
      this.dialog = false;
    },
    selectVillains() {
      this.selectCharacterType = this.heroTypes.villain;
      this.dialog = false;
    },
    confirmSelectMode(selectModeName) {
      this.selectMode = selectModeName;
      this.selectModeDialog = false;
    }
  }
};
</script>

<style scoped>
.selectedHero {
  position: fixed;
  bottom: 0;
  display: flex;
  background: #00000040;
  width: 100%;
}

.btn {
  flex: 100;
}
</style>
