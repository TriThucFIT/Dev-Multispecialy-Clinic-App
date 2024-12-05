import { CardInfo } from '@renderer/components/CardInfo'
import { PrescriptionList } from '@renderer/components/Pharmacist/PrescriptionList'
import { PrescriptionInfo } from '@renderer/components/Pharmacist/PrescriptionInfo'
import { useState } from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'

export default function PharmacistDashboard() {
  const [isScreenPatients, setIsScreenPatients] = useState<boolean>(true)

  return (
    <div className="w-screen h-screen flex *:bg-gradient-to-b from-blue-100 to-white">
      <div className="min-h-screen w-full overflow-auto">
        <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#299ec4]">
          Phòng Khám Đa Khoa DMC - Quầy Thuốc
        </h1>
        <CardInfo />

        <div className="flex flex-col lg:flex-row gap-6 w-full p-4">
          <div className="relative">
            {isScreenPatients ? (
              <div className="absolute flex items-center justify-center bg-primary-400 hover:bg-primary-300 text-white rounded-full size-10 text-xl -right-4 -top-2">
                <MdKeyboardDoubleArrowLeft onClick={() => setIsScreenPatients(!isScreenPatients)} />
              </div>
            ) : (
              <div className="lg:absolute lg:left-6 lg:-top-16 flex items-center justify-center gap-2 bg-white w-[220px] rounded-lg py-2">
                <div>Danh sách Hóa Đơn</div>
                <div className="flex items-center justify-center bg-primary-400 hover:bg-primary-300 text-white rounded-full size-8 text-xl">
                  <MdKeyboardDoubleArrowRight
                    onClick={() => setIsScreenPatients(!isScreenPatients)}
                  />
                </div>
              </div>
            )}

            {isScreenPatients && <PrescriptionList />}
          </div>

          <div className="w-full">
            <PrescriptionInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
