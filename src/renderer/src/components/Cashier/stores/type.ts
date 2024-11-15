import { Address } from '@renderer/components/Receptionits/Admission/stores'
import { InvoiceStatus } from '../enums'

export type PatientFromQueue = {
  id?: number
  fullName?: string
  email?: string
  phone?: string
  dob?: string
  age?: number
  condition?: string
  priority?: number
  status?: string
  arrivalOrder?: number
  gender?: boolean
  symptoms?: string
  waitingTime?: number
  address?: Address
}

export type InvoiceFormQueue = {
  id: number
  total_amount: number
  status: InvoiceStatus
  date: Date
  patient: PatientFromQueue
  items: InvoiceItem[]
}

export type InvoiceItem = {
  item: string
  status: InvoiceStatus
  quantity?: number
  price: number
}
