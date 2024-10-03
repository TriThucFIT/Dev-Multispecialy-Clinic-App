import AxiosInstance from '@renderer/api/config/axios.config'
import { LoginRequest, LoginResponse } from '@renderer/types/Auth/login'
import { User } from '@renderer/types/User/user'

export class AuthService {
  static async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await AxiosInstance.post<LoginResponse>('/auth/login', loginRequest)
    return response.data
  }

  static async getProfile(): Promise<User> {
    const response = await AxiosInstance.get<User>('/auth/profile')
    return response.data
  }
}
