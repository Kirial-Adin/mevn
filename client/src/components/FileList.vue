<script setup>
import File from '../components/File.vue'
import { useFileStore } from '../stores/file'
import { onMounted, computed } from 'vue';


const store = useFileStore()
const filesList = computed(() => store.dirInfo.files)
const currentDir = computed(() => store.dirInfo.currentDir)

onMounted( async() => {
    await store.getFiles(currentDir.value)
});

</script>

<template>
    <div class="filelist">
        <div class="filelist__header">
            <div class="filelist__name">Название</div>
            <div class="filelist__date">Дата</div>
            <div class="filelist__size">Размер</div>
        </div>
        <File v-for="file in filesList" :key="file._id" :file="file" />
    </div>
</template>

<style scoped>
@import '../utils/colors.css';

.filelist {
    margin: 20px 0;

    .filelist__header{
        display: grid;
        grid-template-columns: 1fr 4fr repeat(4, 1fr);
    }
    .filelist__name{
        grid-column-start: 2;
    }
    .filelist__date{
        grid-column-start: 5;
        justify-content: center;
    }
    .filelist__size{
        grid-column-start: 6;
        justify-content: center;
    }
}
</style>