import AxiosInstance from '@renderer/api/config/axios.config'

export const AppointmentService = {
  async getAppointmentByPatient(phone: string): Promise<any> {
    if (!phone || phone.length === 0) {
      return null
    }
    return await AxiosInstance.get(`/appointment/patient/${phone}`)
  },

  async registrationPatient(data: any): Promise<any> {
    return await AxiosInstance.post('admission/patient-registration', data)
  }
}
