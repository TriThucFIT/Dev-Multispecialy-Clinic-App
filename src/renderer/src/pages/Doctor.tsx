import { FC } from 'react'
import LogoDMC from '../assets/logoDMC.png'
import { PatientList } from '@renderer/components/Doctors/PatientList'
import { CardInfo } from '@renderer/components/Doctors/CardInfo'

export const Doctor: FC = () => {
  return (
    <div className="relative w-screen h-screen bg-[url('../assets/bg-doctor.png')] bg-cover bg-center">
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
      <div className="absolute lg:w-1/5 w-1/3 top-36 left-5">
        <CardInfo />
      </div>
      <div className="h-[80%] overflow-hidden">
        <PatientList />
      </div>
    </div>
  )
}
