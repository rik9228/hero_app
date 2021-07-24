<!-- ヒーローデータの雛形内容を記入。具体的に入ってくるヒーロー（例えばバットマンとか）はここでは関係ない。親のコンポーネントからpropsで流し込まれる。 -->
<template>
  <div :class="{ 'is-winner': isWinner, 'is-loser': isLoser }">
    <v-card class="mx-auto pa-5" :class="{ selected }">
      <v-progress-circular v-if="!imgLoaded" indeterminate color="primary"></v-progress-circular>
      <!-- //オリジナル画像 -->
      <v-img
        v-if="!loadError"
        @error="errorImage"
        @load="onLoad"
        class="image"
        :src="hero.image.url"
        alt=""
      ></v-img>
      <!-- //デフォルト画像 -->
      <v-img
        v-if="loadError"
        @load="onLoad"
        class="image"
        src="@/assets/img_noImage@2x.png"
      ></v-img>

      <p class="text-center mt-5 mb-0 font-weight-medium" v-if="showName">
        {{ hero.name }}
      </p>
      <div class="powerstats" v-if="showDetail">
        <div class="powerstats__wrapper wrapper">
          <p class="text-center mt-2">出版社：{{ hero.biography.publisher }}</p>
          <p class="text-center mt-2">初登場：{{ hero.biography.firstAppearance }}</p>
          <ul class="powerstats__listFrame pl-0">
            <li class="text-center mt-1 mb-1" v-if="showName">
              知能：{{ hero.powerstats.intelligence }}
            </li>
            <li class="text-center mt-1 mb-1" v-if="showName">
              強さ：{{ hero.powerstats.strength }}
            </li>
            <li class="text-center mt-1 mb-1" v-if="showName">速さ：{{ hero.powerstats.speed }}</li>
            <li class="text-center mt-1 mb-1" v-if="showName">
              耐久性：{{ hero.powerstats.durability }}
            </li>
            <li class="text-center mt-1 mb-1" v-if="showName">力：{{ hero.powerstats.power }}</li>
            <li class="text-center mt-1 mb-1" v-if="showName">
              戦闘力：{{ hero.powerstats.combat }}
            </li>
          </ul>
        </div>
      </div>

      <div class="d-flex">
        <div v-if="selectable">
          <v-btn v-if="selected" depressed color="primary" @click="onSelect" class="mb-5">
            解除
          </v-btn>
          <v-btn v-if="!selected" depressed color="primary" @click="onSelect" class="mb-5">
            選択
          </v-btn>
        </div>
        <!-- <v-btn v-if="bookmarkable" depressed color="primary">
          お気に入り
        </v-btn> -->
      </div>
      <!-- <router-link :to="`/character/${id}`">詳細</router-link> -->
    </v-card>
    <!-- <button @click="addd">addd</button> -->
    <HorizontalBarChart v-if="showBarChart" :chartData="chartData" :options="options" />
  </div>
</template>

<script>
import HorizontalBarChart from "@/components/HorizontalBarChart.vue";

export default {
  name: "Hero",
  components: {
    HorizontalBarChart
  },
  props: {
    hero: { type: Object },
    // id: { type: String },
    // name: { type: String },
    // imageUrl: { type: String },
    selectable: { type: Boolean, default: false },
    bookmarkable: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    bookmarked: { type: Boolean, default: false },
    showName: { type: Boolean, default: true },
    showBarChart: { type: Boolean, default: false },
    showDetail: { type: Boolean, default: false }
  },
  data() {
    return {
      status: [],
      isNull: false,
      imgLoaded: false,
      loadError: false,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0, // 最小値
                max: 1000, // 最大値
                stepSize: 5 // 間隔
              },
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    };
  },
  computed: {
    chartData() {
      const datacollection = {
        labels: ["stats1"],
        datasets: [
          {
            label: "Data1",
            backgroundColor: "blue",
            // data: [Number(this.hero.powerstats.power)]
            data: [this.hero.totalStats]
          }
        ]
      };
      if (this.powerUp !== 0) {
        datacollection.datasets.push({
          label: "Data2",
          backgroundColor: "red",
          data: [this.hero.powerUp]
        });
      }
      return datacollection;
    },
    isWinner() {
      return this.hero.winner;
    },
    isLoser() {
      return this.hero.loser;
    }
  },
  methods: {
    addd() {
      this.datacollection = {
        labels: ["January"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [80]
          }
        ]
      };
    },
    onSelect() {
      this.$emit("select", this.hero);
    },
    onLoad() {
      console.log("ロードされました");
      this.imgLoaded = true;
    },
    errorImage() {
      console.log("エラーイメージ");
      this.loadError = true;
    }
  }
};
</script>

<style>
* {
  list-style: none;
}

.selected {
  background: red;
}

.d-flex {
  display: flex;
  justify-content: center;
}

.wrapper {
  max-width: 960px;
  width: calc(100% - 16px * 2);
  margin: 0 auto;
}

.listFrame {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
}

.image {
  max-width: 150px;
  width: 100%;
  margin: 0 auto;
}

.is-winner {
  background: yellow;
}

.is-loser {
  background: purple;
}
</style>
alt="" alt=""
