'use client'

import { useEffect } from 'react'
import { PatientList } from '../components/Doctors/PatientQueue'
import { CurrentPatientDetails } from '../components/Doctors/CurrentPatientDetails'
import { PatientExamination } from '../components/Doctors/PatientExamination'
import { Patient } from '@renderer/types/Patient/patient'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { createPatient, PatientQueue } from '@renderer/utils/PriorityQueueCustomize'
import { Allergy, EmergencyInfo, LabTest, Medication, VitalSigns } from '@renderer/types/Doctor'
import {
  aiAssistEnabledState,
  allergiesState,
  currentPatientState,
  labTestsState,
  medicationsState,
  patientListState,
  vitalSignsState,
  additionalNotesState,
  diagnosisState,
  followUpDateState,
  medicalHistoryState,
  prescriptionState,
  selectedLabTestsState,
  emergencyPatientList,
  isProcessingEmergencyState
} from '@renderer/states/doctor'
import { CardInfo } from '@renderer/components/CardInfo'
import { UserState } from '@renderer/state'
import { AdmissionSattus } from '@renderer/components/Receptionits/Admission/enums'

export default function EnhancedDoctorScreen() {
  const [currentPatient, setCurrentPatient] = useRecoilState<Patient | null>(currentPatientState)
  const [labTests, _setLabTests] = useRecoilState<LabTest[]>(labTestsState)
  const [medications, _setMedications] = useRecoilState<Medication[]>(medicationsState)
  const [allergies, _setAllergies] = useRecoilState<Allergy[]>(allergiesState)
  const [vitalSigns, _setVitalSigns] = useRecoilState<VitalSigns>(vitalSignsState)
  const [aiAssistEnabled, _setAiAssistEnabled] = useRecoilState<boolean>(aiAssistEnabledState)
  const [patientsList, setPatientsList] = useRecoilState<Patient[]>(patientListState)
  const pQueue = PatientQueue

  const setEmergencyList = useSetRecoilState<EmergencyInfo[]>(emergencyPatientList)
  const isProcessingEmergency = useRecoilValue(isProcessingEmergencyState)
  const userCurent = useRecoilValue(UserState)

  const clearAdditionalNotes = useResetRecoilState(additionalNotesState)
  const clearDiagnosis = useResetRecoilState(diagnosisState)
  const clearFollowUpDate = useResetRecoilState(followUpDateState)
  const clearMedicalHistory = useResetRecoilState(medicalHistoryState)
  const clearPrescription = useResetRecoilState(prescriptionState)
  const clearSelectedLabTests = useResetRecoilState(selectedLabTestsState)
  const clearAllExamination = () => {
    clearAdditionalNotes()
    clearDiagnosis()
    clearFollowUpDate()
    clearMedicalHistory()
    clearPrescription()
    clearSelectedLabTests()
  }

  useEffect(() => {
    ;(window.api as any).onMessage((message: any) => {
      pQueue.enqueue(createPatient(JSON.parse(message)))
      setPatientsList(pQueue.toArray())
    })
    if (isProcessingEmergency) {
      console.log('unSubscribeEmergency')
      ;(window.api as any).unSubscribeEmergency()
    } else {
      if (userCurent?.specialization) {
        ;(window.api as any).subscribeEmergency({
          queue_name: userCurent.specialization.specialization_id + '_specialization',
          doctor_id: userCurent.employeeId
        })
      }

      ;(window.api as any).onEmergency((message: string) => {
        setEmergencyList((oldList) => {
          const emergency: EmergencyInfo = JSON.parse(message)
          if (
            emergency.status !== AdmissionSattus.EMERGENCY &&
            emergency.doctor_id !== userCurent?.employeeId
          ) {
            if (oldList.length === 1) {
              return []
            } else {
              return oldList.filter((item) => item.id !== emergency.id)
            }
          }
          const isUpadte = oldList.some((item) => item.id === emergency.id)
          if (!isUpadte) {
            return [...oldList, emergency]
          }
          const updatedList = oldList.map((item) => {
            if (item.id === JSON.parse(message).id) {
              return {
                ...item,
                status: emergency.status,
                doctor_id: emergency.doctor_id
              }
            }
            return item
          })
          return updatedList
        })
      })
    }
  }, [isProcessingEmergency])

  useEffect(() => {
    if (patientsList.length > 0 && !currentPatient && !isProcessingEmergency) {
      setCurrentPatient(pQueue.dequeue())
    }
  }, [patientsList, currentPatient])

  const handleSubmitExamination = (_examinationData: any) => {
    clearAllExamination()
    const patient = pQueue.dequeue()
    setCurrentPatient(patient)
    setPatientsList(pQueue.toArray())
  }
  return (
    <div className="w-screen h-screen flex *:bg-gradient-to-b from-blue-100 to-white">
      <div className="min-h-screen w-full overflow-auto">
        <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#299ec4]">
          Phòng Khám Đa Khoa DMC - Khoa Tim Mạch
        </h1>
        <CardInfo />
        <div className="flex flex-col lg:flex-row">
          <div className=" w-full p-4 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PatientList />
              <CurrentPatientDetails
                patient={currentPatient}
                allergies={allergies}
                vitalSigns={vitalSigns}
              />
              <PatientExamination
                patient={currentPatient}
                labTests={labTests}
                medications={medications}
                onSubmitExamination={handleSubmitExamination}
                aiAssistEnabled={aiAssistEnabled}
              />
              {/* <QuickActions
                aiAssistEnabled={aiAssistEnabled}
                onAIAssistToggle={setAiAssistEnabled}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
