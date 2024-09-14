import { ICompare, PriorityQueue } from '@datastructures-js/priority-queue'
import { Patient } from '@renderer/types/Patient/patient'

let patientIdCounter = 0

const compare: ICompare<Patient> = (a: Patient, b: Patient) => {
  if (a.priority < b.priority) {
    return -1
  }
  if (a.priority > b.priority) {
    return 1
  }

  if (a.age >= 80 && b.age < 80) {
    return -1
  }
  if (a.age < 80 && b.age >= 80) {
    return 1
  }

  return a.arrivalOrder - b.arrivalOrder
}

export const createPatient = (patient: Patient): Patient => {
  return {
    ...patient,
    arrivalOrder: patientIdCounter++,
    status: 'Chờ khám'
  }
}

export const PatientQueue = new PriorityQueue<Patient>(compare)
