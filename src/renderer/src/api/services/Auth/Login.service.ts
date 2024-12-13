import AxiosInstance from '@renderer/api/config/axios.config'
import { LoginRequest, LoginResponse } from '@renderer/types/Auth/login'
import { User } from '@renderer/types/User/user'

export class AuthService {
  static async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    console.log('AxiosInstance', AxiosInstance.defaults.baseURL)

    const response = await AxiosInstance.post<LoginResponse>('/auth/login', loginRequest)
    return response.data
  }

  static async getProfile(): Promise<User> {
    const response = await AxiosInstance.get<User>('/auth/profile')
    return response.data
  }

  static async forgotPassword(username: string): Promise<boolean> {
    try {
      const response = await AxiosInstance.post('/auth/forgot-password', { username })
      return response?.data?.data
    } catch (error) {
      console.error('Error on forgot password', error)
      throw error
    }
  }

  static async resetPassword(
    username: string,
    old_password: string,
    new_password: string
  ): Promise<boolean> {
    try {
      const response = await AxiosInstance.post('/auth/reset-password', {
        username,
        old_password,
        new_password
      })
      return response?.data?.data
    } catch (error) {
      console.error('Error on reset password', error)
      throw error
    }
  }
}
