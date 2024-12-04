import AxiosInstance from '@renderer/api/config/axios.config'
import {
  LabRequestCreation,
  LabTestList
} from '@renderer/components/Doctors/stores/type'

export class LabTestService {
  async getLabTests(): Promise<LabTestList[]> {
    try {
      const response = await AxiosInstance.get('/labTest')
      if (response.status === 200) {
        return response.data.data
      }
      return []
    } catch (error) {
      console.error('Error on get labtests', error)
      return []
    }
  }

  async createLabRequest(data: LabRequestCreation): Promise<any> {
    try {
      const response = await AxiosInstance.post('/labTest/request', data)
      if (response.data?.data) {
        return response.data.data
      }
      return null
    } catch (error) {
      console.error('Error on create lab request', error)
      return null
    }
  }

  async getLabRequestById(labRequestId: number): Promise<any> {
    try {
      const response = await AxiosInstance.get(`/labTest/lab-request?labRequestId=${labRequestId}`)
      if (response.status === 200) {
        return response.data.data
      }
      return null
    } catch (error) {
      console.error('Error on get lab request by id', error)
      return null
    }
  }
}
