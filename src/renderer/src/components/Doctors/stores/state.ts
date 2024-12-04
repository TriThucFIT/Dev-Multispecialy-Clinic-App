import { DoctorService } from '@renderer/api/services/Doctor/doctor.service'
import { PatientService } from '@renderer/api/services/Patient/patient.service'
import {
  Allergy,
  Doctor,
  EmergencyInfo,
  Medication,
  Specialization,
  VitalSigns
} from '@renderer/types/Doctor'
import { Patient } from '@renderer/types/Patient/patient'
import { atom, selector } from 'recoil'
import { LabRequestResponseDto, LabTestList, MedicationResponseDto } from './type'
import { LabTestService } from '@renderer/api/services/Doctor/labtest.service'
import { UserState } from '@renderer/state'
import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'
import { usePopup } from '@renderer/hooks/usePopup'

const doctorService = new DoctorService()
const patientService = new PatientService()
const labTestService = new LabTestService()
const appointmentService = new AppointmentService()

export const currentPatientState = atom<Patient | null>({
  key: 'currentPatientState',
  default: null
})

export const medicationsState = atom<Medication[]>({
  key: 'medicationsState',
  default: [
    {
      id: 1,
      name: 'Aspirin',
      dosage: '100mg',
      UOM: 'viên',
      directions: 'Uống sau khi ăn, 2v/ngày'
    },
    {
      id: 2,
      name: 'Amoxicillin',
      dosage: '500mg',
      directions: 'Uống trước khi ăn, 1v/ngày',
      UOM: 'viên',
      quantity: 1,
      note: 'Uống trước khi ăn'
    },
    {
      id: 3,
      name: 'Lisinopril',
      dosage: '10mg',
      UOM: 'viên',
      directions: 'Uống sau khi ăn, 1v/ngày'
    }
  ]
})

export const aiAssistEnabledState = atom<boolean>({
  key: 'aiAssistEnabledState',
  default: true
})

export const allergiesState = atom<Allergy[]>({
  key: 'allergiesState',
  default: [
    { id: 1, name: 'Penicillin', severity: 'Nặng' },
    { id: 2, name: 'Đậu phộng', severity: 'Vừa' },
    { id: 3, name: 'Sữa', severity: 'Nhẹ' },
    { id: 4, name: 'Kiwi', severity: 'Nặng' }
  ]
})

export const vitalSignsState = atom<VitalSigns>({
  key: 'vitalSignsState',
  default: {
    bloodPressure: '120/80',
    heartRate: 72,
    temperature: 37.6,
    oxygenSaturation: 98,
    height: 1.7,
    weight: 65
  } as VitalSigns
})

export const patientListState = atom<Patient[]>({
  key: 'messageState',
  default: []
})

export const patientWaitingList = atom<Patient[]>({
  key: 'patientWaitingList',
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
export const treatmentPlanState = atom<string>({
  key: 'treatmentPlanState',
  default: ''
})

export const prescriptionState = atom<MedicationResponseDto[]>({
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

export const medicalRecordSelector = selector({
  key: 'medicalRecordSelector',
  get: async ({ get }) => {
    const patient = get(currentPatientState)
    if (patient) {
      return await patientService.getMedicalRecord(patient.id as string)
    }
    return null
  }
})

export const labtestListSelector = selector<LabTestList[]>({
  key: 'labtestListSelector',
  get: async () => {
    return await labTestService.getLabTests()
  }
})

export const selectedLabTestsState = atom<number[]>({
  key: 'selectedLabTestsState',
  default: []
})

export const createLabRequestState = atom<boolean>({
  key: 'createLabRequestState',
  default: false
})

export const createLabRequestSelector = selector({
  key: 'createLabRequestSelector',
  get: async ({ get }) => {
    const isCreate = get(createLabRequestState)
    if (!isCreate) {
      return null
    } else {
      const selectedLabTests = get(selectedLabTestsState)
      const patient = get(currentPatientState)
      const medicalRecord = get(medicalRecordSelector)
      const doctor = get(UserState)
      if (
        selectedLabTests.length > 0 &&
        patient?.currentRecord &&
        medicalRecord &&
        doctor?.employeeId
      ) {
        const data = {
          doctorId: doctor.employeeId,
          labTestIds: selectedLabTests,
          medicalRecordEntryId: patient.currentRecord.id
        }
        return await labTestService.createLabRequest(data)
      }
    }
    return null
  }
})

export const labRequestsSlector = selector<LabRequestResponseDto[]>({
  key: 'labRequestsSlector',
  get: async ({ get }) => {
    const patient = get(currentPatientState)
    console.log('Patient on lab request', patient?.currentRecord)

    if (patient?.currentRecord?.labRequests && patient.currentRecord.labRequests.length > 0) {
      return Promise.all(
        patient.currentRecord.labRequests.map((labRequest) =>
          labTestService.getLabRequestById(labRequest.id)
        )
      )
    }
    return []
  }
})

export const medicationsSelector = selector<MedicationResponseDto[]>({
  key: 'medicationsSelector',
  get: async () => {
    return await doctorService.getMedicationList()
  }
})

export const isCreatePrescriptionState = atom<boolean>({
  key: 'isCreatePrescriptionState',
  default: false
})

export const submitExaminationSelector = selector({
  key: 'createPrescriptionSelector',
  get: async ({ get }) => {
    const isCreate = get(isCreatePrescriptionState)
    if (!isCreate) {
      return null
    } else {
      const patient = get(currentPatientState)
      const doctor = get(UserState)
      const diagnosis = get(diagnosisState)
      const treatmentPlan = get(treatmentPlanState)
      const prescription = get(prescriptionState)
      const followUpDate = get(followUpDateState)
      const additionalNote = get(additionalNotesState)
      try {
        if (
          patient &&
          patient.currentRecord?.id &&
          doctor &&
          diagnosis &&
          prescription.length > 0
        ) {
          if (followUpDate) {
            const appointment = await appointmentService.createAppointment({
              service: 'InHour',
              date: followUpDate,
              time: '08:00',
              doctor: doctor.fullName,
              specialization: doctor.specialization?.specialization_id,
              symptoms: diagnosis,
              patient: {
                fullName: patient.fullName,
                email: patient.email,
                phone: patient.phone,
                address: patient.address,
                dob: patient.dob ? new Date(patient.dob).toISOString().split('T')[0] : null,
                gender: patient.gender
              }
            })
            if (appointment) {
              usePopup('Tạo lịch hẹn tái khám thành công', 'success')
            }
          }

          const prescriptionCreated = await doctorService.createPrescription({
            note: additionalNote,
            medications: prescription.map((medication) => ({
              quantity: medication.quantity ?? 0,
              note: medication.note ?? '',
              medicationId: medication.id
            })),
            medicalRecordId: patient.currentRecord?.id
          })
          if (prescriptionCreated) {
            usePopup('Tạo đơn thuốc thành công', 'success')
          }

          const submitExamination = await doctorService.submitExamination({
            diagnosis,
            additionalNote,
            medicalRecordEntryId: patient.currentRecord.id,
            treatmentPlan
          })
          if (submitExamination) {
            usePopup('Hoàn thành lượt khám', 'success')
          }
          return submitExamination
        }
        return null
      } catch (error) {
        console.log(error)
        usePopup('Lỗi tạo yêu cầu, thử lại sau', 'error')
        return null
      }
    }
  }
})
