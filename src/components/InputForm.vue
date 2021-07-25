<template>
  <div class="box">
    <p>キャラクターを選択してください。</p>
    <input
      type="text"
      v-model="formValue"
      @change="fetchHeros"
      placeholder="英語でキャラクター名を入力してください：例）Hulk（部分一致可）"
      class="pa-1 col-12"
    />
  </div>
</template>

<script>
export default {
  name: "InputForm",
  data() {
    return {
      formValue: ""
    };
  },
  methods: {
    fetchHeros() {
      this.$emit("onInput", this.formValue);
    }
  }
};
</script>

<style>
.box {
  max-width: 500px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

input[type="text"] {
  border: 1px solid #ccc;
}
</style>
