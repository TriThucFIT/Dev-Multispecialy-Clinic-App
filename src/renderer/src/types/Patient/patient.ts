import { Address } from '@renderer/components/Receptionits/Admission/stores'
import { Doctor } from '../Doctor'
import {
  LabRequestResponseDto,
  MedicationResponseDto
} from '@renderer/components/Doctors/stores/type'
import { AppointmentResponseDto } from '@renderer/components/Receptionits/Appointment/stores/type'

export type Patient = {
  id?: number | string
  fullName?: string
  email?: string
  phone?: string
  dob?: string
  age?: number
  condition?: string
  priority?: number
  status?: string
  arrivalOrder?: number
  gender?: boolean
  symptoms?: string
  waitingTime?: number
  address?: Address
  currentRecord?: {
    id: number
    labRequests?: {
      id: number
      status: string
    }[]
  }
}

export type PatientCreationDTO = {
  fullName?: string
  email?: string
  phone?: string
  address?: Address
  gender?: boolean
  dob?: string
  priority?: number
}

export type MedicalInformationResponseDto = {
  bloodPressure: string
  heartRate: number
  temperature: number
  weight: number
  height: number
}

export type MedicalRecordEntryResponseDto = {
  id: number
  symptoms: string
  doctor: Doctor
  visitDate: Date
  diagnosis: string
  treatmentPlan: string
  medicalInformation: MedicalInformationResponseDto
  note: string
  prescriptions: PrescriptionResponseDto[]
  labRequests: LabRequestResponseDto[]
  appointment: AppointmentResponseDto
}

export type MedicalRecordResponseDto = {
  id: number
  patient: Patient
  notes: string
  entries: MedicalRecordEntryResponseDto[]
}
export type PrescriptionMedicationResponse = {
  id: number
  medication: MedicationResponseDto
  quantity: number
  note: string
}

export type PrescriptionResponseDto = {
  id: number
  note: string
  medications: PrescriptionMedicationResponse[]
}
