import { atom } from 'recoil'
import { InvoiceFormQueue } from './type'
import { InvoiceStatus } from '../enums'

const invoices: InvoiceFormQueue[] = [
  {
    id: 1,
    total_amount: 0,
    status: InvoiceStatus.PENDING,
    date: new Date('2024-12-12T13:24:00'),
    patient: {
      id: 185,
      fullName: 'Trần Thị Ngọc Yến Nhi ',
      dob: '12/12/1999'
    },
    items: []
  },
  {
    id: 2,
    total_amount: 0,
    status: InvoiceStatus.PENDING,
    date: new Date('2024-12-12T13:24:00'),
    patient: {
      id: 2,
      fullName: 'Võ Thị Hồng Nhung',
      dob: '12/12/1999'
    },
    items: []
  },
  {
    id: 3,
    total_amount: 0,
    status: InvoiceStatus.PENDING,
    date: new Date('2024-12-12T13:24:00'),
    patient: {
      id: 3,
      fullName: 'Nguyễn Văn C',
      dob: '12/12/1999'
    },
    items: []
  },
  {
    id: 4,
    total_amount: 0,
    status: InvoiceStatus.PAID,
    date: new Date('2024-12-12T13:24:00'),
    patient: {
      id: 4,
      fullName: 'Nguyễn Văn D',
      dob: '12/12/1999'
    },
    items: []
  }
]

export const billingListState = atom({
  key: 'billingListState',
  default: invoices
})
