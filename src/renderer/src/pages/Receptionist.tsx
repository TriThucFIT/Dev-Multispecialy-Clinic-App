import { FC } from 'react'
import LogoDMC from '../assets/logoDMC.png'
import { useRecoilValue } from 'recoil'
import { UserState } from '@renderer/state'
import { AddmissionForm } from '@renderer/components/Receptionits/AddmissionForm'

export const Receptionist: FC = () => {
  const user = useRecoilValue(UserState)
  return (
    <div className="w-screen h-screen bg-[url('../assets/bg-receptionist-1.png')] bg-cover bg-center">
      <div className="flex lg:h-[12%] h-[20%]">
        <img
          src={LogoDMC}
          alt="logo"
          className="w-28 h-28 md:w-32 md:h-32 border-black object-contain mt-3 ml-3"
        />

        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl font-bold text-white">Phòng Tiếp Nhận</h1>
          <h3 className="text-xl font-semibold text-white">{user.userName}</h3>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-white">Mã NV:</h3>
              <h3 className="text-lg font-semibold text-white ml-2">{user.id}</h3>
            </div>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-white">Chức vụ:</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="border  ">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab tab-active:bg-[#07b7f8]"
            aria-label="Tiếp Nhận Bệnh"
          />
          <div
            role="tabpanel"
            className="tab-content bg-white bg-opacity-45 border-base-300 rounded-box p-6"
          >
            <AddmissionForm />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Check-in"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6  h-full"
          >
            Tab content 2
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6  h-full"
          >
            Tab content 3
          </div>
        </div>
      </div>
    </div>
  )
}
