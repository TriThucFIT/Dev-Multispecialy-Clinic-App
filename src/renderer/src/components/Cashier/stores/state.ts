import { atom, selector } from 'recoil'
import { InvoiceFormQueue, IPayer, PayInvoiceRequest } from './type'
import { CasherService } from '@renderer/api/services/Casher/Casher.service'
import { usePopup } from '@renderer/hooks/usePopup'

const invoices: InvoiceFormQueue[] = []
const caserService = new CasherService()

export const billingListState = atom<InvoiceFormQueue[]>({
  key: 'billingListState',
  default: invoices
})

export const activeBillState = atom<InvoiceFormQueue | null>({
  key: 'activeBillState',
  default: null
})

export const invoiceToPayState = atom<Partial<PayInvoiceRequest> | null>({
  key: 'invoiceToPayState',
  default: null
})

export const payerState = atom<IPayer | null>({
  key: 'payerState',
  default: null
})

export const paymentMethodState = atom<string | null>({
  key: 'paymentMethodState',
  default: null
})

export const isPayingState = atom<boolean>({
  key: 'isPayingState',
  default: false
})

export const payingProcessState = selector({
  key: 'payingProcessState',
  get: async ({ get }) => {
    try {
      const isPaying = get(isPayingState)
      const invoiceToPay = get(invoiceToPayState)
      if (isPaying && invoiceToPay) {
        const response = await caserService.payInvoice(invoiceToPay)
        if (response && response.statusCode === 200) {
          console.log('Paying process success', response)
          usePopup('Thanh toán thành công', 'success')
          return response
        }
        return null
      }
      return null
    } catch (error: any) {
      console.error('Error on paying process', error)
      usePopup(error.errorMessage, 'error')
      return null
    }
  }
})
