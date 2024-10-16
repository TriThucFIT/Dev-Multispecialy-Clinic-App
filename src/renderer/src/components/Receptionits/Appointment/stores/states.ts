import { DoctorAppointment } from '@renderer/types/apointment'
import { PatientCreationDTO } from '@renderer/types/Patient/patient'
import { atom } from 'recoil'

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
  patient?: PatientCreationDTO
  
}

export const formValuesState = atom<FormValuesStep1>({
  key: 'formValuesState',
  default: {} as FormValuesStep1
})
