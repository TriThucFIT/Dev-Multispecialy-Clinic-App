import { CardInfo, eUserType } from '@renderer/components/CardInfo'
import { LoginRequestState } from '@renderer/state'
import { useResetRecoilState } from 'recoil'
import { PrescriptionList } from '@renderer/components/Pharmacist/PrescriptionList'
import { PrescriptionInfo } from '@renderer/components/Pharmacist/PrescriptionInfo'

const PharmactisData = {
  name: 'Trần Văn Tý',
  email: 'ty@hospital.com',
  avatarUrl: '/placeholder.svg?height=40&width=40'
}

export default function PharmacistDashboard() {
  const clearLogin = useResetRecoilState(LoginRequestState)

  const handleLogout = () => {
    clearLogin()
    console.log('Đăng xuất')
  }
  return (
    <div className="h-screen w-screen bg-[url('../assets/bg-pharmactist-1.svg')] bg-cover bg-center">
      <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#07b7f8]">
        Phòng Khám Đa Khoa DMC - Dược Sĩ
      </h1>
      <CardInfo
        userType={eUserType.doctor}
        name={PharmactisData.name}
        email={PharmactisData.email}
        avatarUrl={PharmactisData.avatarUrl}
        onLogout={handleLogout}
      />
      <div className="w-full p-4 grid lg:grid-cols-3 grid-cols-1  gap-4">
        <PrescriptionList />
        <PrescriptionInfo />
      </div>
    </div>
  )
}
