import { PharmacistService } from '@renderer/api/services/Pharmacist/Pharmacist.service'
import { atom, selector } from 'recoil'
import { PrescriptionSendToQueue } from './type'
import { PrescriptionStatus } from './enums'
const pharmacistService = new PharmacistService()

export const currentPrescriptionState = atom<PrescriptionSendToQueue | null>({
  key: 'currentPrescriptionState',
  default: null
})
export const prescriptionListState = atom<PrescriptionSendToQueue[]>({
  key: 'prescriptionListState',
  default: []
})

export const isUpdatePrescriptionStatus = atom<boolean>({
  key: 'isUpdatePrescriptionStatus',
  default: false
})

export const medicalRecordEntrySelector = selector({
  key: 'medicalRecordEntrySelector',
  get: async ({ get }) => {
    try {
      const prescription = get(currentPrescriptionState)
      if (!prescription) return null
      const response = await pharmacistService.getMedicalRecordEntryById(
        prescription.medicalRecordEntryId
      )
      return response
    } catch (error) {
      console.error('Error on get medical record entry by id', error)
      return null
    }
  }
})

export const updatePrescriptionStatus = selector({
  key: 'updatePrescriptionStatus',
  get: async ({ get }) => {
    const isUpdate = get(isUpdatePrescriptionStatus)
    if (!isUpdate) return null
    const prescriptions = get(medicalRecordEntrySelector)
    const response = await pharmacistService.updatePrescriptionStatus(
      prescriptions?.prescriptions.map((pre) => ({
        id: pre.id,
        status: PrescriptionStatus.COMPLETED,
        medicalRecordEntryId: prescriptions.id
      })) || []
    )
    return response
  }
})
