import { Card, CardHeader, CardTitle } from '../ui/card'
import { useRecoilValue } from 'recoil'
import { appointmentStep } from './states/appointmentStep'
import { ScheduleForm } from './ScheduleForm'
import { UserForm } from './UserForm'
import { Suspense } from 'react'

export function AppointmentScheduling() {
  const step = useRecoilValue(appointmentStep)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lên Lịch Hẹn</CardTitle>
      </CardHeader>
      {step === 1 ? (
        <ScheduleForm />
      ) : (
        <Suspense fallback={<div className="loading loading-bars text-primary">Loading...</div>}>
          <UserForm />
        </Suspense>
      )}
    </Card>
  )
}
