<template>
  <div>
    <InputForm @onInput="log" />
    <hero-list :info="info"/>
  </div>
</template>

<script>
import HeroList from '@/components/HeroList.vue';
import InputForm from '@/components/InputForm.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    HeroList,
    InputForm,
  },
  data() {
    return {
      info: [],
      inputVal: '',
      errorValue: '',
    };
  },
  // async mounted() {

  // },
  methods: {
    async log(value) {
      this.inputVal = value;
      const arr = [];
      let result;
      try {
        result = await axios.get(`https://superheroapi.com/api.php/510254346771781/search/${this.inputVal}`);
        result.data.results.forEach((element) => {
          arr.push(element);
          this.info = arr;
          // console.log(this.info);
          this.errorValue = '';
        });
      } catch (error) {
        this.errorValue = 'キャラクターが見つかりません';
        this.info = [];
      }
    },

  },
};
</script>
