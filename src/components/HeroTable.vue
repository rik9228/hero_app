<template>
  <v-data-table
    :headers="headers"
    :items="heroes"
    :items-per-page="-1"
    :hide-default-footer="true"
    class="elevation-1"
    @click:row="onRowClick"
  >
    <template v-slot:item.image="{ item }">
      <v-avatar>
        <img :src="item.image" alt="" />
      </v-avatar>
    </template>
    <template v-slot:item.embrem="{ item }">
      <v-img max-height="50" max-width="50" :src="item.embrem"></v-img>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "HeroTable",
  props: {
    headers: { type: Array, require: true },
    heroes: { type: Array, require: true },
  },
  data() {
    return {};
  },
  methods: {
    onRowClick(item) {
      this.$emit("rowClick", item.id);
    },
  },
};
</script>

<style></style>
