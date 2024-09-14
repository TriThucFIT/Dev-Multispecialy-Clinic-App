import Versions from '@renderer/components/welcome/Versions'
import { FC } from 'react'
import LogoDMC from '../assets/logoDMC.png'
import { LoginForm } from '@renderer/components/welcome/LoginForm'

export const Welcome: FC = () => {
  return (
    <>
      <div className="h-screen bg-[url('../assets/bg-welcome.png')] bg-cover bg-center">
        <div className="flex h-[20%]">
          <img
            src={LogoDMC}
            alt="logo"
            className="w-28 h-28 md:w-32 md:h-32 border-black object-contain mt-3 ml-3"
          />
          <div className="w-full flex justify-center mt-20">
            <h1 className="text-3xl md:text-4xl lg:text-6xl text-center text-[#07b7f8] font-bold font-roboto">
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
