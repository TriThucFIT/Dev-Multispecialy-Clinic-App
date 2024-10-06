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
  address?: string
}

export type PatientCreationDTO = {
  fullName?: string
  email?: string
  phone?: string
  address?: string
  gender?: boolean
  dob?: string
}
