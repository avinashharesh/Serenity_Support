<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import HomePage from './views/HomePage.vue';

export default {
  name: "App",
};
</script>

<style>
/* Global styles can be added here */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
