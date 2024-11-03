<script setup>
import {defineProps} from 'vue'
import { useFileStore } from '../stores/file'

const fileStore = useFileStore()

defineProps({
    file: Object
})
</script>

<template>
    <div class="upload-file">
        <div class="upload__header">
            <div class="name">{{ file.name }}</div>
            <button @click="fileStore.removeUploader(file._id)" class="remove">X</button>
        </div>
        <div class="progress-bar">
            <div class="upload-bar" :style="{width: `${file.progress}%`}"></div>
            <div class="percent">{{ file.progress }}%</div>
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

    .upload__header {
        display: flex;
        justify-content: space-between;
    }
    .progress-bar{ 
        height: 1.25rem;
        border-radius: 8px;
        background-color: var(--color);
        display: flex;
        margin: 3px 0;
    }
    .upload-bar{
        background-color: green;
        border-radius: 8px;
    }
    .percent{
        color: var(--background-color);
        left: 50%;
        position: absolute;
    }
}
</style>