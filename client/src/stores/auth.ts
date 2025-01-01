import { defineStore } from 'pinia'
import { router } from '@/main'
import type { IUser } from '../models/IUser'
import { ref, computed } from 'vue'
import { API_URL } from '../http/api'
import axios from 'axios'
import type { AuthResponse } from '../models/response/AuthResponse'
import AuthService from '../services/AuthService'
import FileService from '../services/FileService'


export const useCoreStore = defineStore('rootStore', () => {
  const userInfo = ref({
    user: {} as IUser,
    isAuth: false,
  })
  const avatar = ref('')
  
  
  const registration = async (email: string, password: string) => {
    try {
      const response = await AuthService.registration(email, password)
      console.log(response.data)
      localStorage.setItem('token', response.data.accessToken)
      userInfo.value = {
        user: response.data.user,
        isAuth: true,
      }
      router.replace('/')
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password)
      console.log(response.data)
      localStorage.setItem('token', response.data.accessToken)
      userInfo.value = {
        user: response.data.user,
        isAuth: true,
      }
      router.replace('/')
    } catch (e: any) {
      alert(e.response?.data?.message)
    }
  }

  const logout = async () => {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      userInfo.value = {
        user: {} as IUser,
        isAuth: false
      }
      console.log(userInfo.value)
      router.replace('/login')
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  const checkAuth = async () => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}api/auth/refresh`, {
        withCredentials: true
      })
      localStorage.setItem('token', response.data.accessToken)
      userInfo.value = {
        user: response.data.user,
        isAuth: true,
      }
      console.log(userInfo.value.isAuth)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
  
  const uploadAvatar = async (file: any) => {
    try {
      const response = await FileService.uploadAvatar(file)
      console.log(response.avatar)
      avatar.value = response.avatar
      console.log(avatar.value)
    } catch (e: any) {
      console.log(e)
    }
  }
  const deleteAvatar = async () => {
    try {
      console.log(avatar.value)
      await FileService.deleteAvatar()
      avatar.value = ''
    } catch (e: any) {
      console.log(e)
    }
  }
  const getAvatar = async () => {
    const response = await FileService.getAvatar()
    // console.log(response)
    avatar.value = response
  }

  return {
    userInfo,
    avatar,
    registration,
    login,
    checkAuth,
    logout,
    uploadAvatar,
    deleteAvatar,
    getAvatar
  }
})
