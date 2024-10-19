type PatientInfo = {
  id: number
  fullName: string
  address: Address
  phone: string
  email?: string
  gender: boolean
  dob: string
  priority?: number
}

type DoctorInfo = {
  id: number
  employeeId: string
  fullName: string
  specialization: specialization
}

type service = {
  id: number
  name: 'InHour' | 'OutHour'
  price: number
}

type specialization = {
  specialization_id: string
  name: string
}

export type Address = {
  address?: string
  city?: string
  state?: string
  country?: string
}

export type Appointment = {
  id: number
  isActive: boolean
  isWalkIn: boolean
  date: string
  time: string
  checkInTime: string | null
  status: AppointmentStatus
  symptoms: string
  doctor: DoctorInfo
  service: service
  patient: PatientInfo
}

export enum AppointmentStatus {
  SCHEDULED = 'Đã đặt lịch',
  PENDING = 'Chờ khám',
  CONFIRMED = 'Đã xác nhận',
  CHECKED_IN = 'Đã đến khám',
  IN_PROGRESS = 'Đang khám',
  COMPLETED = 'Hoàn thành',
  CANCELLED = 'Đã hủy'
}
