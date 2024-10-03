import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'
import { atom, selector } from 'recoil'

export const appointmentStep = atom({
  key: 'appointmentStep',
  default: 1
})

export const appointmentByPatient = atom<any>({
  key: 'appointmentByPatient',
  default: null
})

export const phoneInputState = atom({
  key: 'phoneInputState',
  default: ''
})

export const phoneInputSelector = selector({
  key: 'phoneInputSelector',
  get: ({ get }) => {
    const phone = get(phoneInputState)
    return AppointmentService.getAppointmentByPatient(phone)
  }
})
