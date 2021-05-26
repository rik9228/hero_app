<template>
  <div class="box">
    <p>タイトル</p>
    <input type='text' v-model='formValue' @change="log"/>
  </div>
</template>

<script>

export default {
  name: 'InputForm',
  data() {
    return {
      formValue: '',
    };
  },
  methods: {
    log() {
      this.$emit('onInput', this.formValue);
    },
  },
};
</script>

<style>
.box{
  max-width: 500px;
  margin: 40px auto;
}

input[type="text"]{
  border: 1px solid #ccc;
}
</style>
