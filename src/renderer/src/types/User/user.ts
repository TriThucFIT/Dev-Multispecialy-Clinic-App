export type Permission = {
  isActive: boolean
  resource: Resource
  action: Action[]
}

export type Role = {
  isActive: true
  name: RoleName
  permissions: Permission[]
}

export type User = {
  isActive: boolean
  email: string
  phone: string
  username: string
  fullName: string
  address: string
  gender: boolean
  dob: string
  avatar?: string
  roles: Role[]
}
export enum RoleName {
  Admin = 'ADMIN',
  Doctor = 'DOCTOR',
  Receptionist = 'RECEPTIONIST',
  Patient = 'PATIENT',
  Guest = 'GUEST',
  Casher = 'CASHER',
  LabTech = 'LAB_TECH',
  Pharmacist = 'PHARMACIST',
  Nurse = 'NURSE',
  Accountant = 'ACCOUNTANT',
  Manager = 'MANAGER',
  Director = 'DIRECTOR',
  Developer = 'DEVELOPER'
}

export enum Resource {
  All = 'ALL',
  User = 'USER',
  Role = 'ROLE',
  Permission = 'PERMISSION',
  Account = 'ACCOUNT',
  Patient = 'PATIENT',
  Appointment = 'APPOINTMENT',
  Invoice = 'INVOICE',
  Payment = 'PAYMENT',
  Prescription = 'PRESCRIPTION',
  LabTest = 'LAB_TEST',
  Medication = 'MEDICATION',
  Doctor = 'DOCTOR',
  Receptionist = 'RECEPTIONIST',
  Casher = 'CASHER',
  Pharmacist = 'PHARMACIST',
  addmission = 'ADDMISSION'
}

export enum Action {
  All = 'ALL',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
  Approve = 'APPROVE',
  Reject = 'REJECT',
  Manage = 'MANAGE',
  View = 'VIEW',
  Access = 'ACCESS',
  Execute = 'EXECUTE',
  Admin = 'ADMIN',
  Developer = 'DEVELOPER'
}
