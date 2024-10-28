import { DoctorService } from '@renderer/api/services/Doctor/doctor.service'
import {
  Allergy,
  Doctor,
  EmergencyInfo,
  LabTest,
  Medication,
  Specialization,
  VitalSigns
} from '@renderer/types/Doctor'
import { Patient } from '@renderer/types/Patient/patient'
import { atom, selector } from 'recoil'

const doctorService = new DoctorService()

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
  default: []
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
export const DoctorListState = atom<Doctor[] | []>({
  key: 'DoctorListState',
  default: []
})

export const specializationsState = atom<Specialization[]>({
  key: 'specializationsState',
  default: [] as Specialization[]
})

export const doctorSelectedState = atom<Doctor | null>({
  key: 'doctorSelectedState',
  default: null
})
export const specializationSelectedState = atom<string | null>({
  key: 'specializationSelectedState',
  default: null
})

export const doctorSelector = selector<Doctor[]>({
  key: 'doctorSelector',
  get: ({ get }) => {
    const doctors = get(DoctorListState)
    const specializationSelected = get(specializationSelectedState)
    if (doctors.length === 0) {
      return doctorService.getDoctors()
    }
    if (specializationSelected) {
      const filteredDoctors = doctors.filter(
        (doctor) => doctor.specialization.specialization_id === specializationSelected
      )
      return filteredDoctors.length ? filteredDoctors : []
    }
    return doctors
  }
})

export const specializationSelector = selector<Specialization[]>({
  key: 'specializationSelector',
  get: ({ get }) => {
    const specializations = get(specializationsState)
    if (specializations.length === 0) {
      return doctorService.getSpecializations()
    }
    return specializations ?? []
  }
})

// Patient Appointment State
export const patientByPhone = atom<Patient[] | null>({
  key: 'patientByPhone',
  default: []
})

//Emergency Patient State
export const emergencyPatient = atom<EmergencyInfo | null>({
  key: 'emergencyPatient',
  default: null
})

export const isProcessingEmergencyState = atom<boolean>({
  key: 'isProcessingEmergency',
  default: false
})

export const emergencyPatientList = atom<EmergencyInfo[]>({
  key: 'emergencyPatientList',
  default: []
})
