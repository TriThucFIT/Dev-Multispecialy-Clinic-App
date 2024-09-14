import { atom, selector } from 'recoil'
import { LoginRequest, LoginResponse } from './types/Auth/login'
import { User } from './types/User/user'
import { Patient } from './types/Patient/patient'

export const LoginRequestState = atom<LoginRequest>({
  key: 'LoginRequestState',
  default: {
    userName: '',
    password: ''
  }
})

export const IsLoggedState = atom<boolean>({
  key: 'IsLoggedState',
  default: false
})

export const TokenState = atom<string>({
  key: 'TokenState',
  default: ''
})

export const UserState = atom<User>({
  key: 'UserState',
  default: {
    id: 0,
    userName: '',
    email: '',
    roles: []
  }
})

export const LoggedStateSelector = selector<LoginResponse>({
  key: 'LoggedStateSelector',
  get: async ({ get }) => {
    const loginRequest = get(LoginRequestState)
    // const response = await login(loginRequest)
    const response: LoginResponse = {
      token: 'token',
      user: {
        id: 1,
        userName: loginRequest.userName
      }
    }

    if (response.user.userName === 'doctor') {
      (window.api as any).send('start-listening')
    } else {
      (window.api as any).send('stop-listening')
    }
    return response
  }
})

export const patientListState = atom<Patient[]>({
  key: 'messageState',
  default: []
})

