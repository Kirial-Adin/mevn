import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUploadStore = defineStore('', () => {
  const uploadInfo = ref({
    isVisiable: true,
    files: []
  })
  const hideUploader = () => {
    uploadInfo.value = {
      isVisiable: false,
      files: []
    }
  }
  const showUploader = () => {
    uploadInfo.value = {
      isVisiable: true,
      files: []
    }
  }

  return { uploadInfo, hideUploader, showUploader }
})
