import { PrescriptionStatus } from './enums'

export type PrescriptionSendToQueue = {
  medicalRecordEntryId: number
  patient: Partial<PatientInPrescription>
  doctor: string
  status: PrescriptionStatus
  note: string
}

export type PatientInPrescription = {
  id: number
  name: string
  phone: string
  dob: string
  priority: number
  arrivalOrder: number
  age: number
}

export type PrescriptionUpdateDto = {
  id: number
  status: PrescriptionStatus
  medicalRecordEntryId: number
}
