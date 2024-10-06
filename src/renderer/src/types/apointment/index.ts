import { PatientCreationDTO } from '../Patient/patient'

export type CreateAppointment = {
  service?: string
  doctor?: DoctorAppointment
  date?: string
  time?: string
  symptoms?: string
  patient?: PatientCreationDTO
}

export type DoctorAppointment = {
  name?: string
  specialization?: string
}

export type CreateRegistrationDto = {
  status: string
  isWalkIn: boolean
  patient: PatientCreationDTO
  doctor_id?: number
  receptionist_phone: string
  appointment_id?: number
  service: string
  date?: Date
  symptoms?: string
  specialization?: string
}
