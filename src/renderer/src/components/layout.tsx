import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
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
  const [userState, setUserState] = useRecoilState(UserState)

  const getDashboardComponent = (roleName: RoleName) => {
    switch (roleName) {
      case RoleName.Receptionist:
        return <ReceptionistDashboard />
      case RoleName.Doctor:
        if (userState?.specialization) {
          ;(window.api as any).send('start-listening', {
            queue_name: userState.specialization.specialization_id + '_specialization',
            doctor_id: userState.employeeId
          })
        } else {
          ;(window.api as any).send('stop-listening')
        }
        return <EnhancedDoctorScreen />
      case RoleName.Casher:
        return <CashierDashboard />
      case RoleName.Pharmacist:
        return <PharmacistDashboard />
      default:
        return <Welcome />
    }
  }

  if (userState) {
    return (
      <Routes>
        <Route path="/" element={getDashboardComponent(userState.roles[0].name)} />
      </Routes>
    )
  }

  if (LoggedState.state === 'hasValue' && loginUser.state === 'hasValue') {
    const userContents = loginUser.contents
    if (userContents) {
      setUserState({
        ...userContents,
        avatar: userContents.avatar ? userContents.avatar : '/placeholder.svg?height=40&width=40',
        isActive: userContents.isActive !== undefined ? userContents.isActive : false
      })
    } else {
      return <Welcome />
    }
  }
  if (LoggedState.state === 'loading' || loginUser.state === 'loading') {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="loading loading-bars loading-lg text-primary" />
      </div>
    )
  }

  return <Welcome />
}
