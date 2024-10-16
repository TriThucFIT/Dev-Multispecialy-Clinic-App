export type Doctor = {
  id: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  fullName: string
  address: string
  phone: string
  gender: boolean
  dob: Date
  employeeId: string
  specialization: Specialization
}

export type LabTest = {
  id: number
  name: string
  result?: string
}

export type Medication = {
  id: number
  name: string
  dosage: string
}

export type Allergy = {
  id: number
  name: string
  severity: 'Nhẹ' | 'Vừa' | 'Nặng'
}

export type VitalSigns = {
  bloodPressure: string
  heartRate: number
  temperature: number
  oxygenSaturation: number
}

export enum Specializations {
  CARDIOLOGY = 'Cardiology', // Tim mạch
  DERMATOLOGY = 'Dermatology', // Da liễu
  GASTROENTEROLOGY = 'Gastroenterology', // Tiêu hóa
  NEUROLOGY = 'Neurology', // Thần kinh
  ORTHOPEDICS = 'Orthopedics', // Chỉnh hình
  PEDIATRICS = 'Pediatrics', // Nhi khoa
  PSYCHIATRY = 'Psychiatry', // Tâm thần
  RADIOLOGY = 'Radiology', // Chẩn đoán hình ảnh
  SURGERY = 'Surgery', // Phẫu thuật
  UROLOGY = 'Urology' // Tiết niệu
}

export type Specialization ={
  specialization_id: string,
  name: string
}
