import { atom, selector } from 'recoil'
import { LoginRequest, LoginResponse } from './types/Auth/login'
import { User } from './types/User/user'
import { AuthService } from './api/services/Auth/Login.service'

export const LoginRequestState = atom<LoginRequest | null>({
  key: 'LoginRequestState',
  default: null
})

export const TokenState = atom<string>({
  key: 'TokenState',
  default: localStorage.getItem('access_token') || ''
})

export const UserState = atom<User | null>({
  key: 'UserState',
  default: JSON.parse(localStorage.getItem('user_login') || 'null')
})

export const LoggedStateSelector = selector<LoginResponse | null>({
  key: 'LoggedStateSelector',
  get: async ({ get }) => {
    const loginRequest = get(LoginRequestState)
    if (!loginRequest) {
      return null
    }
    const response: LoginResponse = await AuthService.login(loginRequest)
    localStorage.setItem('access_token', response.access_token)
    return response
  }
})
export const ProfileSelector = selector<User | null>({
  key: 'ProfileSelector',
  get: async ({ get }) => {
    const login = get(LoggedStateSelector)
    if (!login) {
      return null
    }
    const response: User = await AuthService.getProfile()
    localStorage.setItem(
      'user_login',
      JSON.stringify({
        ...response,
        avatar: response.avatar ? response.avatar : '/placeholder.svg?height=40&width=40',
        isActive: response.isActive !== undefined ? response.isActive : false
      })
    )
    return response
  }
})
