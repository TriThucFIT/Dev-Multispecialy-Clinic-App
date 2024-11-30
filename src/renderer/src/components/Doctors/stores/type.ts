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
  onSubmitExamination: (data: ExaminationData) => void
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
  type: string
  testData: any
  isVisible: boolean
  setIsVisible: (value: boolean) => void
}
