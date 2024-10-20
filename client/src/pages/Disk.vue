<script setup>
import Header  from '../components/Header.vue';
import FileList from '../components/FileList.vue';
import PopUp from '../components/PopUp.vue';
import Uploader from '../components/Uploader.vue';
import { ref, computed } from 'vue';
import { useFileStore } from '../stores/file'

const store = useFileStore()
const currentDir = computed(() => store.dirInfo.currentDir)
const display = ref('none')
const dragEnter = ref(false)

const PopUpFunc = () => {
    if (display.value === 'none') {
        display.value = 'flex'
    } else {
        display.value = 'none'
    }
}
const backClickHendler = async() => {
    const backDir = store.stackDir.pop()
    await store.openDir(backDir)
}
const fileUploadHandler = (event) => {
    const files = [...event.target.files]
    files.forEach( async(file) => {
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
const dropHandler = async(event) => {
    event.preventDefault()
    event.stopPropagation()
    const files= [...event.dataTransfer.files]
    files.forEach( async(file) => {
        await store.uploadFile(file, currentDir.value)
    })
    dragEnter.value = false
}
const createDirHendler = async (currentDir, dirName) => {
  await store.createDir(currentDir, dirName)
  display.value = 'none'
}

</script>

<template>
    <Header />
    <div  v-if="!dragEnter" class="disk"  @dragenter="dragEnterHandler" @dragover="dragEnterHandler">
        <div class="disk__btn">
            <button class="btn__back" @click="backClickHendler">Назад</button>
            <button @click="PopUpFunc" class="btn__create">Создать папку</button>
            <div class="disk__upload">
                <label for="disk__upload-input" class="disk__upload-lable">Загрузить файл</label>
                <input multiple @change="(event) => fileUploadHandler(event)" type="file" id="disk__upload-input" class="disk__upload-input">
            </div>
        </div>
        <FileList />
        <PopUp :style="{display: display}" :PopUpFunc="PopUpFunc" :createDirHendler="createDirHendler" />
        <Uploader />
    </div>
    <div v-else class="drop-area" @dragleave="dragLeaveHandler" @drop="dropHandler" @dragover="dragEnterHandler">
        Перетащите файлы сюда
    </div>
</template>

<style scoped>
@import '../utils/colors.css';

.disk {
    margin-top: 20px;

    .disk__btn {
        display: flex;
    }
    .btn__create{
        margin-left: 20px;
    }
    .disk__upload-input{
        display: none;
    }
    .disk__upload-lable{
        border: 2px dashed var(--color);
        padding: 5px 10px;
        cursor: pointer;
        margin-left: 10px;
    }
}
.drop-area {
    width: 90%;
    height: calc(100vh - 60px - 40px);
    margin: 20px;
    border: 2px dashed var(--color);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
}
</style>