import { CardInfo } from '@renderer/components/CardInfo'
import { BillingAndPayment } from '@renderer/components/Cashier/BillingAndPayment'
import { BillingList } from '@renderer/components/Cashier/BillingList'
import { useState } from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'

export default function CashierDashboard() {
  const [isScreenPatients, setIsScreenPatients] = useState<boolean>(true)

  return (
    <div className="w-screen h-screen flex *:bg-gradient-to-b from-blue-100 to-white">
      <div className="min-h-screen w-full overflow-auto">
        <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#299ec4]">
          Phòng Khám Đa Khoa DMC - Quầy Thu Ngân
        </h1>
        <CardInfo />
        <div className="flex flex-col lg:flex-row">
          <div className="flex gap-6 w-full p-4">
            <div className="relative">
              {isScreenPatients ? (
                <div className="absolute flex items-center justify-center bg-primary-400 hover:bg-primary-300 text-white rounded-full size-10 text-xl -right-4 -top-2">
                  <MdKeyboardDoubleArrowLeft
                    onClick={() => setIsScreenPatients(!isScreenPatients)}
                  />
                </div>
              ) : (
                <div className="absolute left-6 -top-16 flex items-center justify-center gap-2 bg-white w-[220px] rounded-lg py-2">
                  <div>Danh sách Hóa Đơn</div>
                  <div className="flex items-center justify-center bg-primary-400 hover:bg-primary-300 text-white rounded-full size-8 text-xl">
                    <MdKeyboardDoubleArrowRight
                      onClick={() => setIsScreenPatients(!isScreenPatients)}
                    />
                  </div>
                </div>
              )}

              {isScreenPatients && <BillingList />}
            </div>

            <div className="w-full">
              <BillingAndPayment />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
