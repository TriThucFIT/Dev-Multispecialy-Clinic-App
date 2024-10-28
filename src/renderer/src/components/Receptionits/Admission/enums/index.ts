export enum AdmissionSattus {
  PENDING = 'Chờ',
  IN_PROGRESS = 'Đang xử lý',
  DONE = 'Hoàn Thành',
  EMERGENCY = 'Cấp Cứu'
}

export type AcceptEmergency = {
  doctor_id: string
  registration_id: number
}
