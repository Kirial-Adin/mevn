<script setup>
import Header from '../components/Header.vue'
import FileList from '../components/FileList.vue'
import PopUp from '../components/PopUp.vue'
import Uploader from '../components/Uploader.vue'
import {showLoader} from '../utils/showLoader'
import { ref, computed, onMounted } from 'vue'
import { useFileStore } from '../stores/file'

const store = useFileStore()
const currentDir = computed(() => store.dirInfo.currentDir)
const display = ref('none')
const dragEnter = ref(false)
const sort = ref('type')
const loader = showLoader


const PopUpFunc = () => {
  if (display.value === 'none') {
    display.value = 'flex'
  } else {
    display.value = 'none'
  }
}
const backClickHendler = async () => {
  const curDir = store.stackDir.pop()
  const backDir = store.stackDir.filter(() => store.stackDir.value !== curDir)
  const lastDir = backDir.pop()
  await store.openDir(lastDir)
}
const fileUploadHandler = (event) => {
  const files = [...event.target.files]
  files.forEach(async (file) => {
    await store.uploadFile(file, currentDir.value)
  })
}
const dragEnterHandler = (event) => {
  event.preventDefault()
  event.stopPropagation()
  dragEnter.value = true
}
const dragLeaveHandler = (event) => {
  event.preventDefault()
  event.stopPropagation()
  dragEnter.value = false
}
const dropHandler = async (event) => {
  event.preventDefault()
  event.stopPropagation()
  const files = [...event.dataTransfer.files]
  files.forEach(async (file) => {
    await store.uploadFile(file, currentDir.value)
  })
  dragEnter.value = false
}
const createDirHendler = async (currentDir, dirName) => {
  await store.createDir(currentDir, dirName)
  display.value = 'none'
}
const sortChange = async (e) => {
  sort.value = e.target.value
  await store.getFiles(currentDir.value?._id, sort.value)
}
const fileViewToPlate = () => {
  store.fileView = 'plate'
}

const fileViewToList = () => {
  store.fileView = 'list'
}

onMounted(async () => {
  await store.getFiles(currentDir.value?._id, sort.value)
})

</script>

<template>
  <Header />
  <div v-if="loader" class="loader">
    <div class="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div v-else>
    <div v-if="!dragEnter" class="disk" @dragenter="dragEnterHandler" @dragover="dragEnterHandler">
      <div class="disk__btn">
        <button class="btn__back" @click="backClickHendler">Назад</button>
        <button @click="PopUpFunc" class="btn__create">Создать папку</button>
        <div class="disk__upload">
          <label for="disk__upload-input" class="disk__upload-lable">Загрузить файл</label>
          <input
            multiple
            @change="(event) => fileUploadHandler(event)"
            type="file"
            id="disk__upload-input"
            class="disk__upload-input"
          />
          <select :value="sort" @change="(e) => sortChange(e)" class="disk__select" id="">
            <option value="name">По имени</option>
            <option value="type">По типу</option>
            <option value="date">По дате</option>
            <option value="size">По размеру</option>
          </select>
          <button @click="fileViewToPlate" class="disk__plate"></button>
          <button @click="fileViewToList" class="disk__list"></button>
        </div>
      </div>
      <FileList />
      <PopUp
        :style="{ display: display }"
        :PopUpFunc="PopUpFunc"
        :createDirHendler="createDirHendler"
      />
      <Uploader />
    </div>
    <div
      v-else
      class="drop-area"
      @dragleave="dragLeaveHandler"
      @drop="dropHandler"
      @dragover="dragEnterHandler"
    >
      Перетащите файлы сюда
    </div>
  </div>
</template>

<style scoped>
@import '../utils/colors.css';

.disk {
  margin-top: 20px;

  .disk__btn {
    display: flex;
  }
  .btn__create {
    margin-left: 20px;
  }
  .btn__back,
  .btn__create {
    height: 30px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: white;
    border: 1px solid var(--color);
    border-radius: 5px;
    &:hover {
      border: 2px solid var(--color);
    }
  }
  .disk__upload-input {
    display: none;
  }
  .disk__upload-lable {
    border: 2px dashed var(--color);
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 5px;
    padding: 5px 10px;
  }
  .disk__plate, .disk__list{
    height: 20px;
    width: 20px;
    border: none;
    outline: none;
    cursor: pointer;
    background: no-repeat center center;
    background-size: contain;
    margin: 0 10px;
  }
  .disk__list{
    background-image: url('../assets/img/ul.svg');
  }
  .disk__plate{
    background-image: url('../assets/img/plate.svg');
    margin-left: 200px;
  }
}
.drop-area {
  width: 100%;
  height: calc(100vh - 60px - 40px);
  margin: 20px;
  border: 2px dashed var(--color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}

.disk__select {
  margin-left: 10px;
  border: 1px solid var(--color);
  cursor: pointer;
  border-radius: 5px;
  height: 30px;
}

.loader{
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(30vh - 50px);
}

.lds-default,
.lds-default div {
  margin-top: 200px;
}
.lds-default {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-default div {
  position: absolute;
  width: 6.4px;
  height: 6.4px;
  background: var(--color);
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 36.8px;
  left: 66.24px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22.08px;
  left: 62.29579px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11.30421px;
  left: 51.52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7.36px;
  left: 36.8px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11.30421px;
  left: 22.08px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22.08px;
  left: 11.30421px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 36.8px;
  left: 7.36px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 51.52px;
  left: 11.30421px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62.29579px;
  left: 22.08px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66.24px;
  left: 36.8px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62.29579px;
  left: 51.52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 51.52px;
  left: 62.29579px;
}
@keyframes lds-default {
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}

@media screen and (max-width: 500px) {
  .disk__upload-lable {
    font-size: 14px;
  }
  .btn__create,
  .btn__back {
    font-size: 10px;
    margin-left: 0;
  }
}
</style>
