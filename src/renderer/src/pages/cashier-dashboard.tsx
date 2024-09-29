import { CardInfo, eUserType } from '@renderer/components/CardInfo'
import { LoginRequestState } from '@renderer/state'
import { useResetRecoilState } from 'recoil'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { useState } from 'react'
import { BillingAndPayment } from '@renderer/components/Cashier/BillingAndPayment'
import { BillingList } from '@renderer/components/Cashier/BillingList'

const DoctorData = {
  name: 'Trần Minh Thuận',
  email: 'minhthuan@hospital.com',
  avatarUrl: '/placeholder.svg?height=40&width=40'
}

export default function CashierDashboard() {
  const [activeTab, setActiveTab] = useState('billing')
  const clearLogin = useResetRecoilState(LoginRequestState)

  const handleLogout = () => {
    clearLogin()
    console.log('Đăng xuất')
  }

  return (
    <div className="w-screen h-screen bg-[url('../assets/bg-cashier.png')] bg-cover bg-center overflow-auto">
      <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-bluePrimary">
        Phòng Khám Đa Khoa DMC - Thu Ngân
      </h1>
      <CardInfo
        userType={eUserType.cashier}
        name={DoctorData.name}
        email={DoctorData.email}
        avatarUrl={DoctorData.avatarUrl}
        onLogout={handleLogout}
      />
        <div className="w-full p-4 grid lg:grid-cols-3 grid-cols-1 gap-4">
          <BillingList />
          <BillingAndPayment />
      </div>
    </div>
  )
}
