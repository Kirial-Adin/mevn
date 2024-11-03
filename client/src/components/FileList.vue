<script setup>
import File from '../components/File.vue'
import { useFileStore } from '../stores/file'
import { computed } from 'vue'

const store = useFileStore()
const filesList = computed(() => store.dirInfo.files)
const fileView = computed(() => store.fileView)
</script>

<template>
  <div v-if="fileView === 'list'">
    <div class="files" v-if="filesList.length === 0">
      <div>Файлы не найдены</div>
    </div>
    <div v-else class="filelist">
      <div class="filelist__header">
        <div class="filelist__name">Название</div>
        <div class="filelist__date">Дата</div>
        <div class="filelist__size">Размер</div>
      </div>
      <transition-group name="file" tag="div" class="animation">
        <div v-for="file in filesList" :key="file._id">
          <File :file="file" />
        </div>
      </transition-group>
    </div>
  </div>
  <div v-if="fileView === 'plate'">
    <div class="filePlate">
      <File v-for="file in filesList" :key="file._id" :file="file" />
    </div>
  </div>
</template>

<style scoped>
@import '../utils/colors.css';

.files {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(30vh - 50px);
}

.filelist {
  margin: 20px 0;

  .filelist__header {
    display: grid;
    grid-template-columns: 1fr 4fr repeat(4, 1fr);
  }
  .filelist__name {
    grid-column-start: 2;
  }
  .filelist__date {
    grid-column-start: 5;
    justify-content: center;
  }
  .filelist__size {
    grid-column-start: 6;
    justify-content: center;
  }
}

.filePlate {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
}

.file-enter-active {
  animation: file-enter 500ms forwards;
}

@keyframes file-enter {
  0% {
    opacity: 0;
    transform: translateY(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
