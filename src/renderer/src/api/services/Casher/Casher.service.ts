import AxiosInstance from '@renderer/api/config/axios.config'
import { InvoiceFormQueue, PayInvoiceRequest } from '@renderer/components/Cashier/stores'
import { ApiResponseDto, ErrorDto } from '@renderer/types/ApiResponse'

export class CasherService {
  async getInvoices(): Promise<InvoiceFormQueue[]> {
    try {
      const response = await AxiosInstance.get('/invoice')
      if (response.status === 200) {
        return response.data
      }
      return []
    } catch (error) {
      console.error('Error on get invoices', error)
      return []
    }
  }

  async getInvoiceById(id: number): Promise<InvoiceFormQueue | null> {
    try {
      const response = await AxiosInstance.get(`/invoice/${id}`)
      if (response.status === 200) {
        return response.data
      }
      return null
    } catch (error) {
      console.error('Error on get invoice by id', error)
      return null
    }
  }

  async createInvoice(invoice: InvoiceFormQueue): Promise<InvoiceFormQueue | null> {
    try {
      const response = await AxiosInstance.post('/invoice', invoice)
      if (response.status === 201) {
        return response.data
      }
      return null
    } catch (error) {
      console.error('Error on create invoice', error)
      return null
    }
  }

  async updateInvoice(invoice: InvoiceFormQueue): Promise<InvoiceFormQueue | null> {
    try {
      const response = await AxiosInstance.put(`/invoice/${invoice.id}`, invoice)
      if (response.status === 200) {
        return response.data
      }
      return null
    } catch (error) {
      console.error('Error on update invoice', error)
      return null
    }
  }

  async deleteInvoice(id: number): Promise<boolean> {
    try {
      const response = await AxiosInstance.delete(`/invoice/${id}`)
      if (response.status === 200) {
        return true
      }
      return false
    } catch (error) {
      console.error('Error on delete invoice', error)
      return false
    }
  }

  async payInvoice(invoice: Partial<PayInvoiceRequest>): Promise<ApiResponseDto<any>> {
    try {
      const response = await AxiosInstance.post('/casher/invoices/pay', invoice)
      return response.data
    } catch (error: any) {
      console.error('Error on pay invoice', error)
      throw new ErrorDto(error.response.data.message, error.response.status)
    }
  }
}
