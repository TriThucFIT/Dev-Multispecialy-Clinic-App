import { PatientCreationDTO } from '../Patient/patient'

export type CreateAppointment = {
  isWalkIn: boolean
  service: string
  doctor: DoctorAppointment
  symptoms: string
  patient: PatientCreationDTO
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
  appointment_id?: number
  service: string
  symptoms?: string
  specialization: string
}
