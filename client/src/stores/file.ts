import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import FileService from '../services/FileService'
import {showLoader} from '../utils/showLoader'

const loader = showLoader


export const useFileStore = defineStore('fileStore', () => {
  const dirInfo = ref({
    files: [],
    currentDir: null,
  })
  const uploadFiles = ref([])
  const stackDir = ref([])
  const fileView = ref('list')

  const getFiles = async (dirId: any, sort: string) => {
    try {
      loader.value = !loader.value
      const response =  await FileService.getFiles(dirId, sort)
      // console.log(response.data)
      dirInfo.value = {
        files: response.data,
        currentDir: dirId
      }
    } catch (e: any) {
      alert(e.response.data.message)
    } finally{
      loader.value = !loader.value
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
      uploadFiles.value.push(response.data)
      location.reload()
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  const openDir = async(dirId: any, sort: string) => {
    try {
      const response = await FileService.getFiles(dirId, sort)
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
      uploadFiles.value.push(response.data)
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

  const removeUploader = (fileId: any) => {
    uploadFiles.value = uploadFiles.value.filter(() => uploadFiles.value[0]._id !== fileId)
    console.log(uploadFiles.value)
  }

  const searchFiles = async(searchName: string, dirId: any,) => {
    try {
      loader.value = !loader.value
      const response = await FileService.searchFiles(searchName)
      dirInfo.value = {
        files: response.data,
        currentDir: dirId
      }
    } catch(e: any) {
      alert(e.response.data.message)
    } finally {
      loader.value = !loader.value
    }
    
  }

  return {
    dirInfo,
    uploadFiles,
    getFiles,
    stackDir,
    createDir,
    openDir,
    pushToStack,
    uploadFile,
    downloadFile,
    deleteFile,
    removeUploader,
    searchFiles,
    fileView,
  }
})
