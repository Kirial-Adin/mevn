<script setup>
import UploadFile from './UploadFile.vue'
import { computed } from 'vue'
import { useUploadStore } from '../stores/upload'
import { useFileStore } from '../stores/file'

const uplodStore = useUploadStore()
const fileStore = useFileStore()
const fileList = computed(() => fileStore.uploadFiles)
const isVisiable = computed(() => uplodStore.uploadInfo.isVisiable) 

</script>

<template>
    <div v-if="isVisiable" class="uploader">
        <div class="uploader__header">
            <div class="uploader__title">Загрузки</div>
            <button @click="uplodStore.hideUploader" class="uploader__close">X</button>
        </div>
        <UploadFile v-for="file in fileList" :key="file._id" :file="file"/>
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