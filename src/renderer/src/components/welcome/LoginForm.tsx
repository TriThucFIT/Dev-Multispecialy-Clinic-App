import { LoginRequestState } from '@renderer/state'
import { FC, useState } from 'react'
import { useSetRecoilState } from 'recoil'

export const LoginForm: FC = () => {
  const setLoginRequest = useSetRecoilState(LoginRequestState)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoginRequest({ userName, password })
  }

  return (
    <>
      <div className="w-full flex justify-center mt-20">
        <form
          onSubmit={handleSubmit}
          className="w-1/3 lg:h-[400px] bg-white bg-opacity-90 rounded-lg p-5"
        >
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-[#07b7f8]">Tên Đăng Nhập</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              className="border-2 border-[#07b7f8] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#07b7f8] focus:border-transparent"
            />
          </div>
          <div className="flex flex-col lg:mt-10 mt-5">
            <label className="text-lg font-semibold text-[#07b7f8]">Mật Khẩu</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="border-2 border-[#07b7f8] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#07b7f8] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full border border-[#07b7f8] hover:text-white text-[#07b7f8] font-semibold rounded-lg p-2 lg:mt-10 mt-5 hover:bg-[#07b7f8] focus:outline-none focus:ring-2 focus:ring-[#07b7f8] focus:border-transparent"
          >
            Đăng Nhập
          </button>
          <div className="flex justify-end lg:mt-10 mt-5">
            <a href="#" className="text-[#07b7f8] font-semibold">
              Quên Mật Khẩu?
            </a>
          </div>
        </form>
      </div>
    </>
  )
}
