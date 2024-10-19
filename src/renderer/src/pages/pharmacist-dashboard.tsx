import { CardInfo } from '@renderer/components/CardInfo'
import { PrescriptionList } from '@renderer/components/Pharmacist/PrescriptionList'
import { PrescriptionInfo } from '@renderer/components/Pharmacist/PrescriptionInfo'

export default function PharmacistDashboard() {
  return (
    <div className="h-screen w-screen bg-[url('../assets/bg-pharmactist-1.svg')] bg-cover bg-center">
      <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#299ec4]">
        Phòng Khám Đa Khoa DMC - Dược Sĩ
      </h1>
      <CardInfo />
      <div className="w-full p-4 grid lg:grid-cols-3 grid-cols-1  gap-4">
        <PrescriptionList />
        <PrescriptionInfo />
      </div>
    </div>
  )
}
