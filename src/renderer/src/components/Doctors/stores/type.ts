import { Patient } from '@renderer/types/Patient/patient'

export type Medication = {
  id: number
  name: string
  dosage: string
  directions?: string
  UOM?: string
  quantity?: number
}

export type PatientExaminationProps = {
  patient: Patient | null
  medications: Medication[]
  onSubmitExamination: (data: ExaminationData, type:string) => void
  aiAssistEnabled: boolean
}

export type ExaminationData = {
  diagnosis: string
  selectedLabTests: number[]
  prescription: Medication[]
  followUpDate: string
  additionalNotes: string
}

export type RenderTestResult = {
  type?: string
  testData: LabRequestResponseDto
  isVisible: boolean
  setIsVisible: (value: boolean) => void
}

export type LabTestList = {
  id: number
  name: string
  description: string
  labtests: Partial<LabTest>[]
}

export type LabTest = {
  id: number
  name: string
  price: number
  description: string
  result: string
}

export type LabRequestCreation = {
  doctorId: string
  labTestIds: number[]
  medicalRecordEntryId: number
}

export type TestResultResponseDto = {
  result: string
  detail: Record<string, any>[]
  notes: string
  images: string[]
}

export type LabRequestResponseDto = {
  labTest: {
    id: number
    name: string
  }
  requestDate: Date
  status: string
  testResult?: TestResultResponseDto
}
