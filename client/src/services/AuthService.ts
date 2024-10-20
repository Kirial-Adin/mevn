import $api from '@/http/api'
import type { AuthResponse } from '../models/response/AuthResponse'
import type { AxiosResponse } from 'axios'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('api/auth/login', { email, password })
  }
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('api/auth/registration', {
      email,
      password
    })
  }
  static async logout(): Promise<void> {
    return $api.post('api/auth/logout')
  }
}
