<script setup>
import Header from './components/Header.vue'
import { onMounted } from 'vue'
import { useCoreStore } from './stores/auth.ts'
import { RouterView } from 'vue-router'

const store = useCoreStore()

onMounted(async () => {
  await store.checkAuth()
  await store.getAvatar()
})
</script>

<template>
  <div  class="app">
    <Header />

    <RouterView />
  </div>
</template>

<style scoped>
@import './utils/colors.css';
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-color);
  color: var(--color);
}
</style>
