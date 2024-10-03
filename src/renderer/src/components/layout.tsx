import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { RoleName } from '@renderer/types/User/user'
import ReceptionistDashboard from '@renderer/pages/receptionist-dashboard'
import EnhancedDoctorScreen from '@renderer/pages/doctor-dashboard'
import CashierDashboard from '@renderer/pages/cashier-dashboard'
import PharmacistDashboard from '@renderer/pages/pharmacist-dashboard'
import { Welcome } from '@renderer/pages/welcome'
import { LoggedStateSelector, ProfileSelector, UserState } from '@renderer/state'

export const Layout: FC = () => {
  const LoggedState = useRecoilValueLoadable(LoggedStateSelector)
  const loginUser = useRecoilValueLoadable(ProfileSelector)
  const setUserState = useSetRecoilState(UserState)

  const getDashboardComponent = (roleName: RoleName) => {
    switch (roleName) {
      case RoleName.Receptionist:
        return <ReceptionistDashboard />
      case RoleName.Doctor:
        return <EnhancedDoctorScreen />
      case RoleName.Casher:
        return <CashierDashboard />
      case RoleName.Pharmacist:
        return <PharmacistDashboard />
      default:
        return <Welcome />
    }
  }

  if (LoggedState.state === 'hasValue' && loginUser.state === 'hasValue') {
    const userContents = loginUser.contents
    if (userContents) {
      setUserState({
        ...userContents,
        avatar: userContents.avatar ? userContents.avatar : '/placeholder.svg?height=40&width=40',
        isActive: userContents.isActive !== undefined ? userContents.isActive : false
      })
    }
    if (userContents && userContents.roles && userContents.roles.length > 0) {
      const roleName = userContents.roles[0].name
      return (
        <Routes>
          <Route path="/" element={getDashboardComponent(roleName)} />
        </Routes>
      )
    } else {
      console.warn('No role found for user')
      return <Welcome />
    }
  }
  return (
    <div className="h-screen w-screen justify-center items-center">
      <span className="loading loading-lg loading-infinity text-primary"></span>
    </div>
  )
}
