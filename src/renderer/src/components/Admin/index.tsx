import { useState } from 'react'
import { CardInfo } from '@renderer/components/CardInfo'
import { Tabs, TabsContent, TabsListCol, TabsTriggerCol } from '../ui/tabs'

import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  ScheduleOutlined
} from '@ant-design/icons'
import Dashboard from './dashboard'
import { PatientsDashboard } from './patients'
import { InvoiceDashboard } from './billing'
import { EmployeeDashboard } from './staff'
import { ServicesDashboard } from './services'
import { AppointmentsDashboard } from './appointments'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

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
          Phòng Khám Đa Khoa DMC - Quản Lý
        </h1>
        <CardInfo />
        <div className=" flex flex-col lg:flex-row">
          <div className="w-full p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="grid grid-cols-7 gap-1">
                <TabsListCol className="flex flex-col col-span-1 mt-2 h-[82vh] pt-2 bg-transparent ">
                  <TabsTrigger value="dashboard" title="Dashboard" icon={<DashboardOutlined />} />
                  <TabsTrigger value="appointments" title="Lịch hẹn" icon={<ScheduleOutlined />} />
                  <TabsTrigger value="patients" title="Bệnh Nhân" icon={<UserOutlined />} />
                  <TabsTrigger value="invoices" title="Hóa Đơn" icon={<FileTextOutlined />} />
                  <TabsTrigger value="employees" title="Nhân Viên" icon={<TeamOutlined />} />
                  <TabsTrigger value="services" title="Dịch Vụ" icon={<MedicineBoxOutlined />} />
                </TabsListCol>
                <div className="col-span-6 overflow-hidden h-full max-h-[82vh]">
                  <TabsContent value="dashboard" className="h-full overflow-y-auto">
                    <Dashboard />
                  </TabsContent>
                  <TabsContent value="appointments" className="h-full overflow-y-auto">
                    <AppointmentsDashboard />
                  </TabsContent>
                  <TabsContent value="patients" className="h-full overflow-y-auto">
                    <PatientsDashboard />
                  </TabsContent>
                  <TabsContent value="invoices" className="h-full overflow-y-auto">
                    <InvoiceDashboard />
                  </TabsContent>
                  <TabsContent value="employees" className="h-full overflow-y-auto">
                    <EmployeeDashboard />
                  </TabsContent>
                  <TabsContent value="services" className="h-full overflow-y-auto">
                    <ServicesDashboard />
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
