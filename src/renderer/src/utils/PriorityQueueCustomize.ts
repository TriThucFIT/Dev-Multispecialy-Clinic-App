import { ICompare, PriorityQueue } from '@datastructures-js/priority-queue'
import { Patient } from '@renderer/types/Patient/patient'

const compare: ICompare<Patient> = (a: Patient, b: Patient) => {
  if (a.priority !== undefined && b.priority !== undefined && a.priority < b.priority) {
    return -1
  }
  if (a.priority !== undefined && b.priority !== undefined && a.priority > b.priority) {
    return 1
  }

  if (a.age !== undefined && b.age !== undefined && a.age >= 80 && b.age < 80) {
    return -1
  }
  if (a.age !== undefined && b.age !== undefined && a.age < 80 && b.age >= 80) {
    return 1
  }

  if (a.arrivalOrder !== undefined && b.arrivalOrder !== undefined) {
    return a.arrivalOrder < b.arrivalOrder ? -1 : 1
  }
  return 0
}

export const createPatient = (patient: Patient): Patient => {
  return {
    ...patient,
    dob: patient.dob ? new Date(patient.dob).toISOString() : '',
    arrivalOrder: new Date().getTime(),
    status: 'Chờ khám'
  }
}

export const PatientQueue = new PriorityQueue<Patient>(compare)
