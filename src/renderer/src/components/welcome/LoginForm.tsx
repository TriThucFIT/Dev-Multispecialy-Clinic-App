import { LoginRequestState } from '@renderer/state'
import { FC, useState } from 'react'
import {  useSetRecoilState } from 'recoil'
import { OTPForm } from './OTPForm'

export const LoginForm: FC = () => {
  const setLoginRequest = useSetRecoilState(LoginRequestState)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isFogot, setIsFogot] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoginRequest({ username, password })
  }

  return (
    <>
      {isFogot ? (
        <OTPForm />
      ) : (
        <div className="w-full flex justify-center mt-20">
          <form
            onSubmit={handleSubmit}
            className="w-1/3 lg:h-[400px] bg-white bg-opacity-90 rounded-lg p-5"
          >
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#299ec4]">Tên Đăng Nhập</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                required
                className="border-2 border-[#299ec4] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#299ec4] focus:border-transparent"
              />
            </div>
            <div className="flex flex-col lg:mt-10 mt-5">
              <label className="text-lg font-semibold text-[#299ec4]">Mật Khẩu</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                className="border-2 border-[#299ec4] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#299ec4] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full border border-[#299ec4] hover:text-white text-[#299ec4] font-semibold rounded-lg p-2 lg:mt-10 mt-5 hover:bg-[#299ec4] focus:outline-none focus:ring-2 focus:ring-[#299ec4] focus:border-transparent"
            >
              Đăng Nhập
            </button>
            <div className="flex justify-end lg:mt-10 mt-5">
              <button
                onClick={() => setIsFogot(true)}
                type="button"
                className="text-[#299ec4] font-semibold"
              >
                Quên Mật Khẩu?
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
