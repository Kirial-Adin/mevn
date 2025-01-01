import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUploadStore = defineStore('', () => {
  const uploadInfo = ref({
    isVisiable: false,
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
  const changeUploadFile = (uploadFile: any) => {
    uploadInfo.value.files.map((file) =>
      file._id == uploadFile.id ? { ...file, progress: uploadFile.payload.progress } : { ...file }
    )
  }

  return { uploadInfo, hideUploader, showUploader, changeUploadFile }
})
