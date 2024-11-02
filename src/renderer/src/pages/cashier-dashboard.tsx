import { CardInfo } from '@renderer/components/CardInfo'
// import { useState } from 'react'
import { BillingAndPayment } from '@renderer/components/Cashier/BillingAndPayment'
import { BillingList } from '@renderer/components/Cashier/BillingList'

export default function CashierDashboard() {

  return (
    <div className="w-screen h-screen bg-[url('../assets/bg-cashier.png')] bg-cover bg-center overflow-auto">
      <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-bluePrimary">
        Phòng Khám Đa Khoa DMC - Thu Ngân
      </h1>
      <CardInfo />
      <div className="w-full p-4 grid lg:grid-cols-3 grid-cols-1 gap-4">
        <BillingList />
        <BillingAndPayment />
      </div>
    </div>
  )
}
