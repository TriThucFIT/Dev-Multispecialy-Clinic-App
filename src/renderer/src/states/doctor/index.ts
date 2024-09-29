import { Allergy, LabTest, Medication, VitalSigns } from '@renderer/types/Doctor'
import { Patient } from '@renderer/types/Patient/patient'
import { atom } from 'recoil'

export const currentPatientState = atom<Patient | null>({
  key: 'currentPatientState',
  default: null
})

export const medicationsState = atom<Medication[]>({
  key: 'medicationsState',
  default: [
    { id: 1, name: 'Aspirin', dosage: '100mg' },
    { id: 2, name: 'Amoxicillin', dosage: '500mg' },
    { id: 3, name: 'Lisinopril', dosage: '10mg' }
  ]
})

export const aiAssistEnabledState = atom<boolean>({
  key: 'aiAssistEnabledState',
  default: true
})

export const labTestsState = atom<LabTest[]>({
  key: 'labTestsState',
  default: [
    { id: 1, name: 'Xét nghiệm máu' },
    { id: 2, name: 'Chụp X-quang' },
    { id: 3, name: 'Chụp MRI' }
  ]
})

export const allergiesState = atom<Allergy[]>({
  key: 'allergiesState',
  default: [
    { id: 1, name: 'Penicillin', severity: 'Nặng' },
    { id: 2, name: 'Đậu phộng', severity: 'Vừa' }
  ]
})

export const vitalSignsState = atom<VitalSigns>({
  key: 'vitalSignsState',
  default: {
    bloodPressure: '120/80',
    heartRate: 72,
    temperature: 98.6,
    oxygenSaturation: 98
  } as VitalSigns
})

export const patientListState = atom<Patient[]>({
  key: 'messageState',
  default: [
    {
      id: 1,
      name: 'John Doe',
      age: 85,
      gender: 'Male',
      priority: 3,
      symptoms: 'Chest pain, shortness of breath',
      waitingTime: 15,
      arrivalOrder: 0
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 45,
      gender: 'Female',
      priority: 1,
      symptoms: 'Headache, fever',
      waitingTime: 30,
      arrivalOrder: 0
    },
    {
      id: 3,
      name: 'Bob Johnson',
      age: 60,
      gender: 'Male',
      priority: 3,
      symptoms: 'Joint pain, fatigue',
      waitingTime: 25,
      arrivalOrder: 0
    }
  ]
})

export const medicalHistoryState = atom<string>({
  key: 'medicalHistoryState',
  default: ''
})

export const diagnosisState = atom<string>({
  key: 'diagnosisState',
  default: ''
})

export const selectedLabTestsState = atom<number[]>({
  key: 'selectedLabTestsState',
  default: []
})

export const prescriptionState = atom<Medication[]>({
  key: 'prescriptionState',
  default: []
})

export const followUpDateState = atom<string>({
  key: 'followUpDateState',
  default: ''
})

export const additionalNotesState = atom<string>({
  key: 'additionalNotesState',
  default: ''
})
