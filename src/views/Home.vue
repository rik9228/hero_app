<template>
  <div>
    <InputForm @onInput="log" />
    <hero-list :info="info" :selectMode="selectMode" @select="onSelect" />
    <!-- <selected-heros :info="info" /> -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">
              Use Google's location service?
            </v-card-title>
            <v-card-text>終わったの？</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Disagree
              </v-btn>
              <v-btn color="green darken-1" text @click="dialog = false">
                Agree
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
  name: "Home",
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
      dialog: false
    };
  },
  computed: {
    ...mapGetters({
      selectedHeros: "hero/selectedHeros" //メソッド
    }),
    selectMode() {
      return this.selectedHeros.length >= this.limit ? "villain" : "hero";
    }
  },
  watch: {
    // 監視
    selectedHeros() {
      if (this.selectedHeros.length === this.limit) {
        this.dialog = true;
      }
    }
  },
  methods: {
    async log(value) {
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
          // console.log(this.info);
          this.errorValue = "";
        });
      } catch (error) {
        this.errorValue = "キャラクターが見つかりません";
        this.info = [];
      }
    },
    onSelect(hero) {
      // infoをコピー（直接書き換えることになるから）
      const newHero = JSON.parse(JSON.stringify(hero));
      newHero.charcterType = "villain";
      this.$store.dispatch("hero/toggleHeros", { hero: newHero, limit: 3 });
    }
  }
};
</script>
