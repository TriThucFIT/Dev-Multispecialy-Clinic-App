import Versions from '@renderer/components/welcome/Versions'
import { FC } from 'react'
import LogoDMC from '../assets/logoDMC3.png'
import { LoginForm } from '@renderer/components/welcome/LoginForm'

export const Welcome: FC = () => {
  return (
    <>
      <div className="h-screen bg-[url('../assets/bg-welcome.png')] bg-cover bg-center">
        <div className="flex h-[20%]">
          <img
            src={LogoDMC}
            alt="logo"
            className="w-44 h-44 md:w-52 md:h-52 border-black object-contain mt-3 ml-3"
          />
          <div className="w-full flex justify-center mt-20">
            <h1 className="text-3xl md:text-4xl lg:text-6xl text-center text-[#299ec4] font-bold font-roboto">
              Chào Mừng Đến Với Phòng Khám Đa Khoa DMC
            </h1>
          </div>
        </div>
        <LoginForm />
      </div>
      <Versions />
    </>
  )
}
