import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'
import { DoctorService } from '@renderer/api/services/Doctor/doctor.service'
import { CreateRegistrationDto } from '@renderer/types/apointment'
import { Doctor, Specialization } from '@renderer/types/doctor'
import { Patient } from '@renderer/types/Patient/patient'
import { atom, selector } from 'recoil'
import { Appointment } from './types'
import dayjs from 'dayjs'

const doctorService = new DoctorService()
const admissionService = new AppointmentService()

export const patientTypeState = atom<'new' | 'old' | 'appointment'>({
  key: 'patientTypeState',
  default: 'new'
})

export const formValuesAdmisionState = atom<CreateRegistrationDto>({
  key: 'formValuesAdmisionState',
  default: {} as CreateRegistrationDto
})

export const DoctorListState = atom<Doctor[] | []>({
  key: 'DoctorListState',
  default: []
})

export const specializationsState = atom<Specialization[]>({
  key: 'specializationsState',
  default: [] as Specialization[]
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

export const patientByPhone = atom<Patient[] | null>({
  key: 'patientByPhone',
  default: []
})

export const admissionSubmitState = atom<boolean>({
  key: 'admissionSubmitState',
  default: false
})
export const admissionSubmitSelector = selector({
  key: 'admissionSubmitSelector',
  get: ({ get }) => {
    const submit = get(admissionSubmitState)
    try {
      if (submit) {
        const formValues = get(formValuesAdmisionState)
        const response = admissionService.registrationPatient({
          ...formValues,
          status: 'pending',
          isWalkIn: true
        })

        return response
      }
      return null
    } catch (error) {
      console.error("Can't submit admission", error)
      return null
    }
  }
})

export const appointmentByPatientState = atom<Appointment[] | []>({
  key: 'appointmentByPatientState',
  default: []
})

export const appointmentsByDate = atom<Appointment[] | []>({
  key: 'appointmentsByDateSate',
  default: []
})

export const dateToGetAppointment = atom<string | null>({
  key: 'dateToGetAppointment',
  default: dayjs().startOf('day').format()
})

export const appointmentsByDateSelector = selector({
  key: 'appointmentsByDateSelector',
  get: ({ get }) => {
    const date = get(dateToGetAppointment)
    if (date) {
      return admissionService.getAppointmentByDate(date)
    }
    return []
  }
})
