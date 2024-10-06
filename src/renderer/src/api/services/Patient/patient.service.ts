import AxiosInstance from '@renderer/api/config/axios.config'
import { Patient } from '@renderer/types/Patient/patient'

export class PatientService {
  async getPatients(): Promise<Patient[]> {
    try {
      const response = await AxiosInstance.get('/patient')
      if (response.status === 200) {
        return response.data
      }
      return []
    } catch (error) {
      console.error('Error on get patients', error)
      return []
    }
  }

  async getPatientById(id: number): Promise<Patient | null> {
    try {
      const response = await AxiosInstance.get(`/patient/${id}`)
      if (response.status === 200) {
        return response.data
      }
      return null
    } catch (error) {
      console.error('Error on get patient by id', error)
      return null
    }
  }

  async getPatientByPhone(phone: number): Promise<Patient | null> {
    try {
      const response = await AxiosInstance.get(`/patient/phone/${phone}`)
      if (response.status === 200) {
        return response.data
      }
      return null
    } catch (error) {
      console.error('Error on get patient by id', error)
      return null
    }
  }

  async createPatient(patient: Patient): Promise<Patient | null> {
    try {
      const response = await AxiosInstance.post('/patient', patient)
      if (response.status === 201) {
        return response.data
      }
      return null
    } catch (error) {
      console.error('Error on create patient', error)
      return null
    }
  }

  async updatePatient(patient: Patient): Promise<Patient | null> {
    try {
      const response = await AxiosInstance.put(`/patient/${patient.id}`, patient)
      if (response.status === 200) {
        return response.data
      }
      return null
    } catch (error) {
      console.error('Error on update patient', error)
      return null
    }
  }

  async deletePatient(id: number): Promise<boolean> {
    try {
      const response = await AxiosInstance.delete(`/patient/${id}`)
      return response.status === 204
    } catch (error) {
      console.error('Error on delete patient', error)
      return false
    }
  }
}