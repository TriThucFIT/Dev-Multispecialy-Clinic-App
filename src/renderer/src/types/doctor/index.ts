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
