'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsListCol, TabsTriggerCol } from '../components/ui/tabs'
import { EmergencyRegistration } from '../components/Receptionits/EmergencyRegistration'
import { PatientLookup } from '../components/Receptionits/PatientLookup'
import { QueueManagement } from '../components/Receptionits/QueueManagement'
import { CardInfo } from '@renderer/components/CardInfo'
import { BiPencil, BiCalendar, BiSearchAlt, BiListOl } from 'react-icons/bi'
import { TbUrgent } from 'react-icons/tb'
import Appointment from '@renderer/components/Receptionits/Appointment'
import { Adsmission } from '@renderer/components/Receptionits/Admission'

export default function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState('registration')

  const TabsTrigger = (props: { value: string; title: string; icon: JSX.Element }) => (
    <TabsTriggerCol
      className={`text-md lg:text-lg hover:bg-[#299ec4] hover:text-white hover:scale-110 duration-300 lg:justify-normal justify-center cursor-pointer`}
      value={props.value}
    >
      <span className="inline lg:hidden text-2xl">{props.icon}</span>
      <span className="hidden lg:inline text-lg mr-1">{props.icon}</span>
      <span className="hidden lg:inline">{props.title}</span>
    </TabsTriggerCol>
  )

  return (
    <div className="w-screen h-screen flex items-center *:bg-gradient-to-b from-blue-100 to-white">
      <div className="min-h-screen w-full ">
        <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#299ec4]">
          Phòng Khám Đa Khoa DMC - Khu Vực Lễ Tân
        </h1>
        <CardInfo />
        <div className=" flex flex-col lg:flex-row">
          <div className="w-full p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="grid grid-cols-7 gap-1">
                <TabsListCol className="flex flex-col col-span-1 mt-2 h-[82vh] pt-2 bg-transparent ">
                  <TabsTrigger value="registration" title="Đăng Ký" icon={<BiPencil />} />
                  <TabsTrigger value="appointments" title="Lịch Hẹn" icon={<BiCalendar />} />
                  <TabsTrigger value="emergency" title="Cấp Cứu" icon={<TbUrgent />} />
                  <TabsTrigger value="lookup" title="Tra Cứu" icon={<BiSearchAlt />} />
                  <TabsTrigger value="queue" title="Danh Sách Chờ" icon={<BiListOl />} />
                </TabsListCol>
                <div className="col-span-6 overflow-hidden h-full max-h-[82vh]">
                  <TabsContent value="registration" className="h-full overflow-y-auto">
                    <Adsmission />
                  </TabsContent>
                  <TabsContent value="appointments" className="h-full overflow-y-auto">
                    <Appointment />
                  </TabsContent>
                  <TabsContent value="emergency" className="h-full overflow-y-auto">
                    <EmergencyRegistration />
                  </TabsContent>
                  <TabsContent value="lookup" className="h-full overflow-y-auto">
                    <PatientLookup />
                  </TabsContent>
                  <TabsContent value="queue" className="h-full overflow-y-auto">
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
