<template>
  <character-select />
</template>

<script>
import CharacterSelect from "@/components/CharacterSelect.vue";

export default {
  name: "VSmode",
  components: {
    CharacterSelect
  },
  created() {
    console.log("aaaaaaaaa");
  }
};
</script>

<style>
</style>
