import AxiosInstance from '@renderer/api/config/axios.config'
import { AcceptEmergency } from '@renderer/components/Receptionits/Admission/enums'
import { Doctor, Specialization } from '@renderer/types/Doctor'

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
}
