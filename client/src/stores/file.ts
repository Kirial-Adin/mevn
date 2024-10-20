import { defineStore } from 'pinia'
import { ref } from 'vue'
import FileService from '../services/FileService'


export const useFileStore = defineStore('fileStore', () => {
  const dirInfo = ref({
    files: [],
    currentDir: null,
  })
  const stackDir = ref([])

  const getFiles = async (dirId: any) => {
    try {
      const response = await FileService.getFiles(dirId)
      console.log(response.data)
      dirInfo.value = {
        files: response.data,
        currentDir: dirId
      }
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  const createDir = async (dirId: any, name: string) => {
    try {
      const response = await FileService.createDir(dirId, name)
      console.log(response.data)
      dirInfo.value = {
        files: response.data,
        currentDir: dirId
      }
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  const openDir = async(dirId: any) => {
    try {
      const response = await FileService.getFiles(dirId)
      dirInfo.value = {
        files: response.data,
        currentDir: dirId
      }
    } catch (e: any) {
      alert(e)
    }
  } 

  const pushToStack = (dirId: any) => {
    stackDir.value.push(dirId)
  }

  const uploadFile = async (file: any, dirId: any) => {
    try {
      const response = await FileService.uploadFile(file, dirId)
      console.log(response.data)
      dirInfo.value = {
        files: response.data,
        currentDir: dirId
      }
      location.reload()
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  const downloadFile = async (file: any) => {
    try {
      const response = await FileService.downloadFile(file)
    } catch(e: any) {
      alert(e.response.data.message)
    }
  }
  const deleteFile = async (file: any) => {
    try {
      const response = await FileService.deleteFile(file)
      location.reload()
    } catch (e: any) {
      console.log(e)
    }
  }

  return {
    dirInfo,
    getFiles,
    stackDir,
    createDir,
    openDir,
    pushToStack,
    uploadFile,
    downloadFile,
    deleteFile
  }
})
