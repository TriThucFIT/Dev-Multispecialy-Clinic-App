'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { PatientRegistration } from '../components/Receptionits/PatientRegistration'
import { AppointmentScheduling } from '../components/Receptionits/AppointmentScheduling'
import { BillingAndPayment } from '../components/Receptionits/BillingAndPayment'
import { EmergencyRegistration } from '../components/Receptionits/EmergencyRegistration'
import { PatientLookup } from '../components/Receptionits/PatientLookup'
import { QueueManagement } from '../components/Receptionits/QueueManagement'
import { CardInfo } from '@renderer/components/CardInfo'
import { LoginRequestState } from '@renderer/state'
import { useResetRecoilState } from 'recoil'

export default function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState('registration')
  const clearLogin = useResetRecoilState(LoginRequestState)

  const handleLogout = () => {
    clearLogin()
    console.log('Đăng xuất')
  }

  const receptionistData = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@hospital.com',
    avatarUrl: '/placeholder.svg?height=40&width=40'
  }

  return (
    <div className="w-screen h-screen bg-[url('../assets/bg-receptionist.png')] bg-cover bg-center overflow-auto">
      <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#07b7f8]">
        Phòng Khám Đa Khoa DMC - Khu Vực Lễ Tân
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-fit p-4">
          <CardInfo
            userType="receptionist"
            name={receptionistData.name}
            email={receptionistData.email}
            avatarUrl={receptionistData.avatarUrl}
            onLogout={handleLogout}
          />
        </div>
        <div className="w-full p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full h-fit grid-cols-6">
              <TabsTrigger
                className="text-md lg:text-lg hover:bg-[#07b7f8] hover:text-white hover:scale-110 duration-300"
                value="registration"
              >
                Đăng Ký
              </TabsTrigger>
              <TabsTrigger
                className="text-md lg:text-lg hover:bg-[#07b7f8] hover:text-white hover:scale-110 duration-300"
                value="appointments"
              >
                Lịch Hẹn
              </TabsTrigger>
              <TabsTrigger
                className="text-md lg:text-lg hover:bg-[#07b7f8] hover:text-white hover:scale-110 duration-300"
                value="billing"
              >
                Thanh Toán
              </TabsTrigger>
              <TabsTrigger
                className="text-md lg:text-lg hover:bg-[#07b7f8] hover:text-white hover:scale-110 duration-300"
                value="emergency"
              >
                Cấp Cứu
              </TabsTrigger>
              <TabsTrigger
                className="text-md lg:text-lg hover:bg-[#07b7f8] hover:text-white hover:scale-110 duration-300"
                value="lookup"
              >
                Tra Cứu
              </TabsTrigger>
              <TabsTrigger
                className="text-md lg:text-lg hover:bg-[#07b7f8] hover:text-white hover:scale-110 duration-300"
                value="queue"
              >
                Quản Lý Hàng Đợi
              </TabsTrigger>
            </TabsList>
            <TabsContent value="registration">
              <PatientRegistration />
            </TabsContent>
            <TabsContent value="appointments">
              <AppointmentScheduling />
            </TabsContent>
            <TabsContent value="billing">
              <BillingAndPayment />
            </TabsContent>
            <TabsContent value="emergency">
              <EmergencyRegistration />
            </TabsContent>
            <TabsContent value="lookup">
              <PatientLookup />
            </TabsContent>
            <TabsContent value="queue">
              <QueueManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
