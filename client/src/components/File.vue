<script setup>
import dirLogo from '../assets/img/dirLogo.png'
import fileLogo from '../assets/img/fileLogo.png'
import sizeFormat from '../utils/sizeFormat'
import { defineProps, ref, computed } from 'vue'
import { useFileStore } from '../stores/file'

const props = defineProps({
  file: Object
})
const store = useFileStore()
const currentDir = ref(props.file._id)
const fileView = computed(() => store.fileView)

const openDirHandler = async (file) => {
  if (file.type === 'dir') {
    store.openDir(currentDir.value)
    store.pushToStack(currentDir.value)
  }
  console.log(currentDir.value)
}
const downloadClickHandler = async (e) => {
  e.stopPropagation()
  await store.downloadFile(props.file)
}
const deleteClickHandler = async (e) => {
  e.stopPropagation()
  await store.deleteFile(props.file)
}
</script>

<template>
  <div v-if="fileView === 'list'">
    <div class="file" @click="openDirHandler(file)">
      <img :src="file.type === 'dir' ? dirLogo : fileLogo" alt="" class="file__image" />
      <div class="file__name">{{ file.name }}</div>
      <div class="file__date">{{ file.date.slice(0, 10) }}</div>
      <div class="file__size">{{ sizeFormat(file.size) }}</div>
      <button
        v-if="file.type !== 'dir'"
        class="file__btn file__download"
        @click="(e) => downloadClickHandler(e)"
      >
        <img src="../assets/img/cloud-download.png" alt="" />
      </button>
      <button class="file__btn file__delete" @click="(e) => deleteClickHandler(e)">
        <img src="../assets/img/delete.png" alt="" />
      </button>
    </div>
  </div>
  <div v-if="fileView === 'plate'">
    <div class="file-plate" @click="openDirHandler(file)">
      <img :src="file.type === 'dir' ? dirLogo : fileLogo" alt="" class="file-plate image" />
      <div class="file__name file-plate">{{ file.name }}</div>
      <div class="file-plate btns">
        <button
          v-if="file.type !== 'dir'"
          class="file-plate__btn  file-plate"
          @click="(e) => downloadClickHandler(e)"
        >
          <img src="../assets/img/cloud-download.png" alt="" />
        </button>
        <button
          class="file-plate__btn  file-plate"
          @click="(e) => deleteClickHandler(e)"
        >
          <img src="../assets/img/delete.png" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../utils/colors.css';

.file {
  display: grid;
  grid-template-columns: 1fr 4fr repeat(4, 1fr);
  margin: 10px 0;
  border-bottom: solid 2px var(--color);
  align-items: center;

  .file__image {
    justify-self: center;
  }

  .file__date {
    grid-column-start: 5;
    justify-self: center;
  }

  .file__size {
    grid-column-start: 6;
    justify-self: center;
  }
  .file__btn {
    display: none;
    border: 1px solid var(--color);
    border-radius: 37px;
    width: 60px;
    height: 30px;
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.02);
    .file__date {
      grid-column-start: 3;
    }
    .file__size {
      grid-column-start: 4;
    }
    .file__download {
      grid-column-start: 5;
      display: block;
    }
    .file__delete {
      grid-column-start: 6;
      display: block;
    }
  }
}

.file-plate {
  width: 150px;
  height: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  .image {
    height: 80px;
    width: 80px;
  }
  .btns {
    display: none;
  }
  .file-plate__btn {
    background: none;
    border: none;
  }
}

.file-plate:hover {
  .btns {
    margin-top: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
