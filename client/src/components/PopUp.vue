<script setup>
import { computed, ref, defineProps } from 'vue'
import { useFileStore } from '../stores/file'

const store = useFileStore()
const dirName = ref('')
const currentDir = computed(() => store.dirInfo.currentDir)
const props = defineProps({
  display: String,
  PopUpFunc: Function,
  createDirHendler: Function,
})

const createDir = async () => {
  props.createDirHendler(currentDir.value, dirName.value)
}

</script>

<template>
  <div :style="{ display: display }" class="popup">
    <div class="popup__content">
      <div class="popup__header">
        <div class="popup__title">Создать новую папку</div>
        <button class="popup__close" @click="PopUpFunc">X</button>
      </div>
      <input v-model="dirName" type="text" placeholder="Название папки" />
      <button class="popup__btn" @click="createDir">Создать</button>
    </div>
  </div>
</template>

<style scoped>
@import '../utils/colors.css';
@import '../utils/input.css';
.popup {
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  input {
    margin: 20px 0;
    border: none;
    border-bottom: 3px solid var(--color);
    background: transparent;
    width: 100%;
    padding: 3px;
    font-weight: bold;
  }
  :focus {
    outline: none;
  }
  .popup__content {
    display: flex;
    flex-direction: column;
    width: 400px;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    align-self: center;
  }
  .popup__header {
    display: flex;
    justify-content: space-between;
  }
  .popup__title {
    font-size: 30px;
    font-weight: bold;
  }
  .popup__close {
    font-size: 30px;
    cursor: pointer;
    background-color: white;
    border: 1px solid var(--color);
    border-radius: 8px;
    color: var(--color);
    &:hover {
      border: 2px solid var(--color);
    }
  }
  .popup__btn {
    height: 30px;
    align-self: flex-end;
    cursor: pointer;
    background-color: white;
    border: 1px solid var(--color);
    border-radius: 5px;
    &:hover {
      border: 2px solid var(--color);
    }
  }
}
</style>
