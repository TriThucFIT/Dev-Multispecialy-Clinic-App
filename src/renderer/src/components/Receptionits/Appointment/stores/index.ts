import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'
import { usePopup } from '@renderer/hooks/usePopup'
import { CreateAppointment, DoctorAppointment } from '@renderer/types/apointment'
import { PatientCreationDTO } from '@renderer/types/Patient/patient'
import { atom, selector } from 'recoil'

const appointmentService = new AppointmentService()
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
    return appointmentService.getAppointmentByPatient(phone)
  }
})

export const appointmentSubmitState = atom<boolean>({
  key: 'appointmentSubmitState',
  default: false
})

export const createAppointmentState = atom<CreateAppointment | null>({
  key: 'createAppointmentState',
  default: null
})

export const phoneInputPatientState = atom<string>({
  key: 'phoneInputPatientState',
  default: ''
})
export const appointmentSubmitSelector = selector({
  key: 'appointmentSubmitSelector',
  get: async ({ get }) => {
    console.log('appointmentSubmitSelector')
    const submit = get(appointmentSubmitState)
    const apointment = get(createAppointmentState)
    if (submit && apointment) {
      try {
        const reps = await appointmentService.createAppointment(apointment)
        if (reps) {
          usePopup('Tạo lịch hẹn thành công', 'success')
          return reps
        }
      } catch (error) {
        console.log(error)
        usePopup('Tạo lịch hẹn thất bại', 'error')
      }
    }
  }
})

export const stepState = atom({
  key: 'stepState',
  default: 1
})

interface FormValuesStep1 {
  service: 'InHour' | 'OutHour'
  date: string
  time: string
  doctor: DoctorAppointment | null
  symptoms: string
  patient: PatientCreationDTO
}

export const formValuesState = atom<FormValuesStep1>({
  key: 'formValuesState',
  default: {} as FormValuesStep1
})
