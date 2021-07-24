<template>
  <div class="">
    <!-- assets 不具合 -->
    <img v-show="selectedItem.value === 'go'" src="../assets/go.png" alt="" />
    <img v-show="selectedItem.value === 'choki'" src="../assets/choki.png" alt="" />
    <img v-show="selectedItem.value === 'pa'" src="../assets/pa.png" alt="" />
    <button
      v-if="showStopButton"
      :disabled="btnDisabled"
      class="stop__button"
      block
      @click="submit"
    >
      ストップ
    </button>
  </div>
</template>

<script>
export default {
  name: "Janken",
  props: {
    showStopButton: { type: Boolean, default: true }
  },
  data() {
    return {
      // display: "go",
      item: {
        go: {
          value: "go",
          next: "choki",
          judge: xx => {
            if (xx.value === this.item.choki.value) return true;
            if (xx.value === this.item.pa.value) return false;
            return undefined;
          }
        }, // xx = 相手の手
        choki: {
          value: "choki",
          next: "pa",
          judge: xx => {
            if (xx.value === this.item.pa.value) return true;
            if (xx.value === this.item.go.value) return false;
            return undefined;
          }
        },
        pa: {
          value: "pa",
          next: "go",
          judge: xx => {
            if (xx.value === this.item.go.value) return true;
            if (xx.value === this.item.choki.value) return false;
            return undefined;
          }
        }
      },
      selectedItem: null,
      intervalId: "",
      btnDisabled: false
    };
  },
  created() {
    this.selectedItem = this.item.go;
    this.intervalId = setInterval(
      () => (this.selectedItem = this.item[this.selectedItem.next]),
      60
    );
  },
  methods: {
    submit() {
      this.btnDisabled = true;
      clearInterval(this.intervalId);
      this.$emit("submit", this.selectedItem);
    }
  }
};
</script>

<style scoped>
img {
  width: 180px;
  height: 180px;
  object-fit: cover;
}
.stop__button {
  background: #07f;
  padding: 0.35em 0.85em;
  color: #fff;
  border-radius: 5px;
  display: block;
  width: 100%;
  transform: translateX(60%);
  margin-top: 40px;
}

.stop__button:disabled {
  background: #ccc;
}
</style>
