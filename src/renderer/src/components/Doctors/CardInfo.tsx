import { FC } from 'react'
import Clock from '../Clock'
import { useResetRecoilState } from 'recoil'
import { LoginRequestState, patientListState } from '@renderer/state'
import { useNavigate } from 'react-router-dom'

export const CardInfo: FC = () => {
  const clearUserInfo = useResetRecoilState(LoginRequestState)
  const clearPatientsList = useResetRecoilState(patientListState)
  const navigate = useNavigate()

  return (
    <div className="w-full h-full relative ">
      <div className="flex bg-white border bg-opacity-90 rounded-xl">
        <figure>
          <img
            src="https://benhvientantao.com/wp-content/uploads/2022/11/BC_CHUONG-removebg-preview.png"
            alt="Movie"
            className="w-14 h-16 lg:w-24 lg:h-32 rounded-tl-xl rounded-bl-xl"
          />
        </figure>
        <div className="">
          <h2 className="font-semibold lg:font-bold">Bác Sĩ : {'Trần Văn Doctor'}</h2>
          <p className=" hidden text-sm md:flex lg:text-md">Mã số : 150602</p>
          <p className=" hidden text-sm md:flex lg:text-md">Khoa : Tim mạch</p>
          <div className="absolute bottom-1 hidden lg:flex">
            <Clock />
          </div>
          <div className="absolute bottom-1 right-3 hidden md:flex">
            <button
              onClick={() => {
                clearUserInfo()
                clearPatientsList()
                navigate('/')
              }}
              className="sm:btn-sm lg:btn-md btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-none"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
