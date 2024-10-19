import { Address } from "@renderer/components/Receptionits/Admission/stores"

export type Patient = {
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

export type PatientCreationDTO = {
  fullName?: string
  email?: string
  phone?: string
  address?: Address
  gender?: boolean
  dob?: string
  priority?: number
}
