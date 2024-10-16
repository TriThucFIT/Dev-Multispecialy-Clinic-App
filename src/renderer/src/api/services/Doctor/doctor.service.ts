import AxiosInstance from '@renderer/api/config/axios.config'
import { usePopup } from '@renderer/hooks/usePopup'
import { Doctor, Specialization } from '@renderer/types/doctor'

export class DoctorService {
  async getDoctors(): Promise<Doctor[]> {
    try {
      const response = await AxiosInstance.get('/doctor')
      if (response.status === 200) {
        usePopup('Doctor List Is getted')
        return response.data
      }
      usePopup('Doctor List Is Empty', {
        icon: 'error'
      })
      return []
    } catch (error) {
      console.error('Error on get doctors', error)
      usePopup('error', {
        icon: 'error'
      })
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
      usePopup('error', {
        icon: 'error'
      })
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
      usePopup('error', {
        icon: '🚑'
      })
      return []
    }
  }
}
