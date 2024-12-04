import AxiosInstance from '@renderer/api/config/axios.config'
import {
  MedicalRecordEntryUpdate,
  MedicationResponseDto,
  PrescriptionDto
} from '@renderer/components/Doctors/stores/type'
import { AcceptEmergency } from '@renderer/components/Receptionits/Admission/enums'
import { Doctor, Specialization } from '@renderer/types/Doctor'
import { MedicalRecordResponseDto, PrescriptionResponseDto } from '@renderer/types/Patient/patient'

export class DoctorService {
  async getDoctors(): Promise<Doctor[]> {
    try {
      const response = await AxiosInstance.get('/doctor')
      if (response.status === 200) {
        return response.data
      }
      return []
    } catch (error) {
      console.error('Error on get doctors', error)
      return []
    }
  }

  async getDoctorBySpecialty(specialization: string): Promise<Doctor[]> {
    try {
      const response = await AxiosInstance.get(`/doctor/specialization/${specialization}`)
      if (response.status === 200) {
        return response.data
      }
      return []
    } catch (error) {
      console.error('Error on get doctors by specialty', error)
      return []
    }
  }

  async getSpecializations(): Promise<Specialization[]> {
    try {
      const response = await AxiosInstance.get('/doctor/specializations')
      if (response.status === 200) {
        return response.data
      }
      return []
    } catch (error) {
      console.error('Error on get specializations', error)
      return []
    }
  }

  async acceptEmergency(acceptEmergency: AcceptEmergency): Promise<any> {
    try {
      const res = await AxiosInstance.post('admission/accept-emergency', acceptEmergency)
      if (res.data) {
        return res.data
      }
      return null
    } catch (error) {
      console.error('Error on accept emergency', error)
      return null
    }
  }

  async getMedicationList(id?: number, name?: string): Promise<MedicationResponseDto[]> {
    try {
      const res = await AxiosInstance.get(
        `medication?${id ? `id=${id}` : ''}${name ? `name=${name}` : ''}`
      )
      if (res.data) {
        return res.data?.data
      }
      return []
    } catch (error) {
      console.error('Error on get medication list', error)
      return []
    }
  }

  async createPrescription(data: PrescriptionDto): Promise<PrescriptionResponseDto | null> {
    try {
      const res = await AxiosInstance.post('medication/prescription', data)
      if (res.data.data) {
        return res.data.data
      }
      return null
    } catch (error) {
      console.error('Error on create prescription', error)
      return null
    }
  }

  async submitExamination(data: MedicalRecordEntryUpdate): Promise<MedicalRecordResponseDto | null> {
    try {
      const res = await AxiosInstance.post('medical-record/entry', data)
      if (res.data) {
        return res.data.data
      }
      return null
    } catch (error) {
      console.error('Error on submit examination', error)
      return null
    }
  }
}
