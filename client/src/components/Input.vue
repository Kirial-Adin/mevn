<script setup>
import { defineProps } from 'vue'

defineProps({
  type: String,
  placeholder: String
})
</script>

<template>
  <input :type="type" :placeholder="placeholder" />
</template>

<style scoped>
@import '../utils/input.css';
</style>
