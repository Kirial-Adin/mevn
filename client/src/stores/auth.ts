import { defineStore } from 'pinia'
import { router } from '@/main'
import type { IUser } from '../models/IUser'
import { ref } from 'vue'
import { API_URL } from '../http/api'
import axios from 'axios'
import type { AuthResponse } from '../models/response/AuthResponse'
import AuthService from '../services/AuthService'

export const useCoreStore = defineStore('rootStore', () => {
  const userInfo = ref({
    user: {} as IUser,
    isAuth: false
  })
  const fileInfo = ref({
    files: [],
    currentDir: ''
  })
  const registration = async (email: string, password: string) => {
    try {
      const response = await AuthService.registration(email, password)
      console.log(response.data)
      localStorage.setItem('token', response.data.accessToken)
      userInfo.value = {
        user: response.data.user,
        isAuth: true
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
        isAuth: true
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
        isAuth: true
      }
      console.log(userInfo.value.isAuth)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
  const getFiles = async (currentDir: string ) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files${currentDir ? '?parent=' + currentDir : ''}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  return {
    userInfo,
    fileInfo,
    registration,
    login,
    checkAuth,
    logout,
    getFiles
  }
})
