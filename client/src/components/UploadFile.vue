<script setup>
import {defineProps} from 'vue'
defineProps({
    file: Object
})
</script>

<template>
    <div class="upload-file">
        <div class="header">
            <div class="name">{{ file.name }}</div>
            <button class="remove">X</button>
        </div>
        <div class="progress-bar">
            <div class="upload-bar"></div>
            <div class="percent">{{ file.progress }}</div>
        </div>
    </div>
</template>

<style scoped>
@import '../utils/colors.css';
.upload-file{
    background-color: var(--background-color);
    border-radius: 8px;
    margin: 5px 0;
    padding: 5px 10px;
    .header{
        display: flex;
        justify-content: space-between;
    }
    .progress-bar{
        height: 1rem;
        border-radius: 8px;
        background-color: var(--color);
        display: flex;
        margin: 3px 0;
    }
}
</style>