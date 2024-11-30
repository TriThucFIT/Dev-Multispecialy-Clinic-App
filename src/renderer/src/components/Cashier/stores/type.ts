import { Address } from '@renderer/components/Receptionits/Admission/stores'
import { InvoiceStatus } from '../enums'
import React from 'react'
import { TableProps } from 'antd'

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
  id: number
  key: React.Key
  name: string
  status: InvoiceStatus
  quantity?: number
  price: number
}

export type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

export interface IPayer {
  fullName?: string
  phone?: string
}

export interface ServiceType {
  key: React.Key
  id: number
  serviceName: string
  statusPayment: InvoiceStatus
  price: number
  unit?: number
  quantity?: number
  dvt?: string
}

export type PayInvoiceRequest = {
  invoice_id: number
  casher_username: string
  items_to_pay: number[]
  total_paid: number
  payment_method: PaymentMethod
  payment_date: Date
  payment_person_name: string
  payment_person_phone: string
  patient: PatientSendToQueue
}
export enum PaymentMethod {
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
  INSURANCE = 'insurance',
  OTHER = 'other'
}
export const PaymentMethodMapper = {
  [PaymentMethod.CASH]: 'Tiền mặt',
  [PaymentMethod.BANK_TRANSFER]: 'Chuyển khoản',
  [PaymentMethod.INSURANCE]: 'Bảo hiểm',
  [PaymentMethod.OTHER]: 'Khác'
}
export class PatientSendToQueue {
  id?: number | string
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
  admission?: AddmissionInQueue
}

class AddmissionInQueue {
  id?: number
  service?: string
  doctor_id?: string
  specialization?: string
}
