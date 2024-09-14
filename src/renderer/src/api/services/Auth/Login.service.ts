import AxiosInstance from '@renderer/api/config/axios.config'
import { LoginRequest, LoginResponse } from '@renderer/types/Auth/login'

export const login = async (user: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await AxiosInstance.post('/auth/login', {
      user
    })
    return response.data
  } catch (error) {
    console.error('Error on login', error)
    throw error
  }
}
