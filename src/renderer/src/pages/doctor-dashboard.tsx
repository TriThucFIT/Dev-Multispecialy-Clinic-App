'use client'

import { useEffect } from 'react'
import { PatientList } from '../components/Doctors/PatientQueue'
import { CurrentPatientDetails } from '../components/Doctors/CurrentPatientDetails'
import { PatientExamination } from '../components/Doctors/PatientExamination'
import { QuickActions } from '../components/Doctors/QuickActions'
import { Patient } from '@renderer/types/Patient/patient'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { createPatient, PatientQueue } from '@renderer/utils/PriorityQueueCustomize'
import { Allergy, LabTest, Medication, VitalSigns } from '@renderer/types/doctor'
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
  selectedLabTestsState
} from '@renderer/states/doctor'
import { CardInfo } from '@renderer/components/CardInfo'
import { LoginRequestState } from '@renderer/state'
const DoctorData = {
  name: 'Trần Văn Tý',
  email: 'vanty@hospital.com',
  avatarUrl: '/placeholder.svg?height=40&width=40'
}

export default function EnhancedDoctorScreen() {
  const [currentPatient, setCurrentPatient] = useRecoilState<Patient | null>(currentPatientState)
  const [labTests, setLabTests] = useRecoilState<LabTest[]>(labTestsState)
  const [medications, setMedications] = useRecoilState<Medication[]>(medicationsState)
  const [allergies, setAllergies] = useRecoilState<Allergy[]>(allergiesState)
  const [vitalSigns, setVitalSigns] = useRecoilState<VitalSigns>(vitalSignsState)
  const [aiAssistEnabled, setAiAssistEnabled] = useRecoilState<boolean>(aiAssistEnabledState)
  const [patientsList, setPatientsList] = useRecoilState<Patient[]>(patientListState)
  const pQueue = PatientQueue
  const clearLogin = useResetRecoilState(LoginRequestState)
  const clearPatient = useResetRecoilState(currentPatientState)
  const clearLabTests = useResetRecoilState(labTestsState)
  const clearMedications = useResetRecoilState(medicationsState)
  const clearAllergies = useResetRecoilState(allergiesState)
  const clearVitalSigns = useResetRecoilState(vitalSignsState)
  const clearAiAssist = useResetRecoilState(aiAssistEnabledState)
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

  const clearAll = () => {
    clearPatient()
    clearLabTests()
    clearMedications()
    clearAllergies()
    clearVitalSigns()
    clearAiAssist()
    clearAllExamination()
    pQueue.clear()
    clearLogin()
  }

  const handleLogout = () => {
    ;(window.api as any).send('stop-listening')
    clearAll()
  }

  useEffect(() => {
    ;(window.api as any).onMessage((message: any) => {
      pQueue.enqueue(createPatient(JSON.parse(message)))
      setPatientsList(pQueue.toArray())
    })
  }, [])

  useEffect(() => {
    if (patientsList.length > 0 && !currentPatient) {
      setCurrentPatient(pQueue.dequeue())
    }
  }, [patientsList, currentPatient])

  const handleSubmitExamination = (examinationData: any) => {
    clearAllExamination()
    const patient = pQueue.dequeue()
    setCurrentPatient(patient)
    setPatientsList(pQueue.toArray())
    console.log('Thông tin khám bệnh đã được gửi', examinationData)
  }
  return (
    <div className="h-screen w-screen bg-[url('../assets/bg-doctor.png')] bg-cover bg-center overflow-auto">
      <h1 className="w-full text-3xl lg:text-5xl font-extrabold text-center my-5 text-[#07b7f8]">
        Phòng Khám Đa Khoa DMC - Khoa Tim Mạch
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-fit p-4">
          <CardInfo
            userType="doctor"
            name={DoctorData.name}
            email={DoctorData.email}
            avatarUrl={DoctorData.avatarUrl}
            onLogout={handleLogout}
          />
        </div>
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
            <QuickActions aiAssistEnabled={aiAssistEnabled} onAIAssistToggle={setAiAssistEnabled} />
          </div>
        </div>
      </div>
    </div>
  )
}
