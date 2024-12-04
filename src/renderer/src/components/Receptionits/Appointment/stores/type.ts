import { DoctorAppointment } from '@renderer/types/apointment'
import { PatientCreationDTO } from '@renderer/types/Patient/patient'

export type AppointmentResponseDto = {
  id: number
  date: string
  time: string
  symptoms: string
  isWalkIn: boolean
  status: string
  service: string
  patient: PatientCreationDTO
  doctor: DoctorAppointment
}
