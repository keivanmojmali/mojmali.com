<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <h1>Hello World!</h1>
    <p>Welcome to my personal website</p>
    
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 3rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 2rem;
}

nav {
  margin: 2rem 0;
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: all 0.3s;
}

nav a:hover {
  background-color: var(--color-background-soft);
}

nav a.router-link-exact-active {
  background-color: var(--vt-c-green);
  color: white;
  border-color: var(--vt-c-green);
}
</style>
