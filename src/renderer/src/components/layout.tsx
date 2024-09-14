import { Doctor } from '@renderer/pages/Doctor'
import { Receptionist } from '@renderer/pages/Receptionist'
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
          LoggedState.user.userName === 'receptionist' ? (
            <Receptionist />
          ) : LoggedState.user.userName === 'doctor' ? (
            <Doctor />
          ) : (
            <Welcome />
          )
        }
      />
    </Routes>
  )
}
