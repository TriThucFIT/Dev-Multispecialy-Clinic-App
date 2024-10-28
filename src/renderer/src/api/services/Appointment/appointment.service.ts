import AxiosInstance from '@renderer/api/config/axios.config'
import { CreateRegistrationDto } from '@renderer/types/apointment'
import { detectQueryType } from '../utils'
import { Appointment } from '@renderer/components/Receptionits/Admission/stores'
import { EmergencyInfo } from '@renderer/types/Doctor'

export class AppointmentService {
  async getAppointmentByPatient(searchValue: string): Promise<Appointment[]> {
    try {
      const queryType = detectQueryType(searchValue)
      const params = {
        phone: queryType === 'phone' ? searchValue : undefined,
        id: queryType === 'patient_id' ? searchValue : undefined,
        email: queryType === 'email' ? searchValue : undefined,
        fullName: queryType === 'fullName' ? searchValue : undefined
      }

      const appointments = await AxiosInstance.get('/appointment', { params })
      if (appointments.status === 200) {
        return appointments.data
      }
      return []
    } catch (error) {
      console.error('Error on get appointment by patient', error)
      return []
    }
  }
  async getAppointmentByDate(date: string): Promise<Appointment[]> {
    try {
      const appointments = await AxiosInstance.get('/appointment', { params: { date } })
      if (appointments.status === 200) {
        return appointments.data
      }
      return []
    } catch (error) {
      console.error('Error on get appointment by date', error)
      return []
    }
  }

  async registrationPatient(data: CreateRegistrationDto): Promise<any> {
    return await AxiosInstance.post('admission/patient-registration', data)
  }
  async registrationEmergency(data: EmergencyInfo): Promise<any> {
    return await AxiosInstance.post('admission/emergency', data)
  }

  async createAppointment(data: any): Promise<any> {
    return await AxiosInstance.post('/appointment', data)
  }
  async cancelAppointment(id: number): Promise<any> {
    return await AxiosInstance.delete(`/appointment/cancel/${id}`)
  }
}
