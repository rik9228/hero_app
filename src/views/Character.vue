<template>
  <div>
    <v-app-bar app color="primary" dark>
    </v-app-bar>
    <p>このページは{{ $route.params.id }}です</p>
  </div>
</template>

<script>
export default {
  name: "Character"
};
</script>

<style></style>
