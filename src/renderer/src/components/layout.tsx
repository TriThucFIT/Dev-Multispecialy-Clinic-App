// import { Doctor } from '@renderer/pages/Doctor'
import EnhancedDoctorScreen from '@renderer/pages/doctor-dashboard'
import ReceptionistDashboard from '@renderer/pages/receptionist-dashboard'
import CashierDashboard from '@renderer/pages/cashier-dashboard'
import PharmacistDashboard from '@renderer/pages/pharmacist-dashboard'
import { Welcome } from '@renderer/pages/welcome'
import { LoggedStateSelector, UserState } from '@renderer/state'
import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const Layout: FC = () => {
  const LoggedState = useRecoilValue(LoggedStateSelector)
  const user = useSetRecoilState(UserState)

  useEffect(() => {
    user(LoggedState.user)
  }, [LoggedState.user])

  return (
    <Routes>
      <Route
        path="/"
        element={
          LoggedState.user.userName === 're' ? (
            <ReceptionistDashboard />
          ) : LoggedState.user.userName === 'doctor' ? (
            <EnhancedDoctorScreen />
          ) : LoggedState.user.userName === 'ca' ? (
            <CashierDashboard />
          ) : LoggedState.user.userName === 'pha' ? (
            <PharmacistDashboard />
          ) : (
            <Welcome />
          )
        }
      />
    </Routes>
  )
}
