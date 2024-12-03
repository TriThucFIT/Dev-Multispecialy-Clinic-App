export enum AdmissionSattus {
  PENDING = 'Chờ',
  IN_PROGRESS = 'Đang xử lý',
  DONE = 'Hoàn Thành',
  EMERGENCY = 'Cấp Cứu',
  LAB_REQUEST = 'Yêu cầu xét nghiệm'
}

export type AcceptEmergency = {
  doctor_id: string
  registration_id: number
}
