import { ICompare, PriorityQueue } from '@datastructures-js/priority-queue'
import { PrescriptionSendToQueue } from '@renderer/components/Pharmacist/store'
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

export const createPrescription = (
  prescription: PrescriptionSendToQueue
): PrescriptionSendToQueue => {
  return {
    ...prescription,
    patient: {
      ...prescription.patient,
      dob: prescription.patient.dob ? new Date(prescription.patient.dob).toISOString() : '',
      arrivalOrder: new Date().getTime()
    }
  }
}

export const PatientQueue = new PriorityQueue<Patient>(compare)
export const PrescriptionQueue = new PriorityQueue<PrescriptionSendToQueue>(
  (a: PrescriptionSendToQueue, b: PrescriptionSendToQueue) => {
    if (
      a.patient.priority !== undefined &&
      b.patient.priority !== undefined &&
      a.patient.priority < b.patient.priority
    ) {
      return -1
    }
    if (
      a.patient.priority !== undefined &&
      b.patient.priority !== undefined &&
      a.patient.priority > b.patient.priority
    ) {
      return 1
    }

    if (
      a.patient.age !== undefined &&
      b.patient.age !== undefined &&
      a.patient.age >= 80 &&
      b.patient.age < 80
    ) {
      return -1
    }
    if (
      a.patient.age !== undefined &&
      b.patient.age !== undefined &&
      a.patient.age < 80 &&
      b.patient.age >= 80
    ) {
      return 1
    }

    if (a.patient.arrivalOrder !== undefined && b.patient.arrivalOrder !== undefined) {
      return a.patient.arrivalOrder < b.patient.arrivalOrder ? -1 : 1
    }
    return 0
  }
)
