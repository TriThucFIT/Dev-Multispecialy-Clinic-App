import AxiosInstance from '@renderer/api/config/axios.config'
import { PrescriptionUpdateDto } from '@renderer/components/Pharmacist/store'
import {
  MedicalRecordEntryResponseDto,
  PrescriptionResponseDto
} from '@renderer/types/Patient/patient'

export class PharmacistService {
  async getMedicalRecordEntryById(
    medicalRecordEntryId: number
  ): Promise<MedicalRecordEntryResponseDto | null> {
    try {
      const response = await AxiosInstance.get(
        `medical-record/medical-record-entry/${medicalRecordEntryId}`
      )
      if (response.status === 200) {
        return response.data.data
      }
      return null
    } catch (error) {
      console.error('Error on get medical record entry by id', error)
      return null
    }
  }

  async updatePrescriptionStatus(
    prescriptions: PrescriptionUpdateDto[]
  ): Promise<PrescriptionResponseDto | null> {
    try {
      const response = await AxiosInstance.put(
        'pharmacist/update-prescriptions-status',
        prescriptions
      )
      if (response.status === 200) {
        return response.data.data
      }
      return null
    } catch (error) {
      console.error('Error on update prescription status', error)
      return null
    }
  }
}
