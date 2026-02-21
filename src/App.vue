<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingScreen from './components/LoadingScreen.vue'
</script>

<template>
  <div id="app">
    <LoadingScreen />
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #5ea85e;
}


#app {
  min-height: 100vh;
}
</style>
