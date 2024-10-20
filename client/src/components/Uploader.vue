<script setup>
import UploadFile from './UploadFile.vue'
const files = [{id: 1, name: 'file', progress: 0}, {id: 2, name: 'file2', progress: 0}]
</script>

<template>
    <div class="uploader">
        <div class="uploader__header">
            <div class="uploader__title">Загрузки</div>
            <button class="uploader__close">X</button>
        </div>
        <UploadFile v-for="file in files" :key="file.id" :file="file"/>
    </div>
</template>

<style scoped>
@import '../utils/colors.css';
.uploader {
    height: 300px;
    width: 300px;
    position: fixed;
    background-color: var(--color);
    bottom: 0;
    right: 0;
    padding: 20px;
    border-radius: 12px;
    .uploader__header{
        display: flex;
        justify-content: space-between;
    }
    .uploader__title{
        color: var(--background-color);
        font-size: 1.2rem;
    }
    .uploader__close{
        padding: 3px;
        cursor: pointer;
    }
}
</style>