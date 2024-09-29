'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsListCol, TabsTriggerCol } from '../components/ui/tabs'
import { PatientRegistration } from '../components/Receptionits/PatientRegistration'
import { AppointmentScheduling } from '../components/Receptionits/AppointmentScheduling'
import { EmergencyRegistration } from '../components/Receptionits/EmergencyRegistration'
import { PatientLookup } from '../components/Receptionits/PatientLookup'
import { QueueManagement } from '../components/Receptionits/QueueManagement'
import { CardInfo, eUserType } from '@renderer/components/CardInfo'
import { LoginRequestState } from '@renderer/state'
import { useResetRecoilState } from 'recoil'
import { BiPencil, BiCalendar, BiSearchAlt, BiListOl } from 'react-icons/bi'
import { TbUrgent } from 'react-icons/tb'

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
  const TabsTrigger = (props: { value: string; title: string; icon: JSX.Element }) => (
    <TabsTriggerCol
      className="text-md lg:text-lg hover:bg-[#07b7f8] hover:text-white hover:scale-110 duration-300"
      value={props.value}
    >
      <span className="mr-1">{props.icon}</span>
      {props.title}
    </TabsTriggerCol>
  )

  return (
    <div className="w-screen h-screen flex items-center">
      <div className="bg-[url('../assets/bg-receptionist-1.png')] size-full bg-cover object-cover bg-centers">
        <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#07b7f8]">
          Phòng Khám Đa Khoa DMC - Khu Vực Lễ Tân
        </h1>
        <CardInfo
          userType={eUserType.receptionist}
          name={receptionistData.name}
          email={receptionistData.email}
          avatarUrl={receptionistData.avatarUrl}
          onLogout={handleLogout}
        />
        <div className=" flex flex-col lg:flex-row">
          <div className="w-full p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="grid grid-cols-7 gap-1">
                <TabsListCol className="flex flex-col col-span-1 mt-2 h-full pt-2">
                  <TabsTrigger value="registration" title="Đăng Ký" icon={<BiPencil />} />
                  <TabsTrigger value="appointments" title="Lịch Hẹn" icon={<BiCalendar />} />
                  <TabsTrigger value="emergency" title="Cấp Cứu" icon={<TbUrgent />} />
                  <TabsTrigger value="lookup" title="Tra Cứu" icon={<BiSearchAlt />} />
                  <TabsTrigger value="queue" title="Quản Lý Hàng Đợi" icon={<BiListOl />} />
                </TabsListCol>
                <div className="col-span-6">
                  <TabsContent value="registration">
                    <PatientRegistration />
                  </TabsContent>
                  <TabsContent value="appointments">
                    <AppointmentScheduling />
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
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
