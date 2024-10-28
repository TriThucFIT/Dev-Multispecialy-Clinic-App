import { FC, Suspense, useState } from 'react'
import { Appointment, AppointmentStatus, formValuesAdmisionState, patientTypeState } from './stores'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Form, Input, Radio, RadioChangeEvent, Select } from 'antd'

import { NewPatient } from './components/NewPatient'
import { OldPatient } from './components/OldPatient'
import { AppointmentPatient } from './components/AppointmentPatient'
import { PatientSearch } from '@renderer/components/PatientSearch'
import { Patient } from '@renderer/types/Patient/patient'
import { AppointmentSearch } from '@renderer/components/AppointmentSearch'
import { usePopup } from '@renderer/hooks/usePopup'
import { checkDate } from '@renderer/utils/formatDate'

export const Adsmission: FC = () => {
  const [patientType, setPatientType] = useRecoilState(patientTypeState)
  const setForm = useSetRecoilState(formValuesAdmisionState)

  const [isShowSearch, setIsShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [form] = Form.useForm()

  const patientTypeOptions = [
    { label: 'Bệnh nhân mới', value: 'new' },
    { label: 'Bệnh nhân cũ', value: 'old' },
    { label: 'Check-in', value: 'appointment' }
  ]

  const handlePatientTypeChange = (value: 'new' | 'old' | 'appointment') => {
    setPatientType(value)
    setForm((prev) => ({ ...prev, patient: {} }))
    form.setFieldsValue({ patientType: value })
  }

  const selectPatient = (patient: Patient) => {
    setIsShowSearch(false)
    setPatientType('new')
    setSearchTerm('')
    setForm((prev) => ({ ...prev, patient }))
  }

  const selectAppointment = (appointment: Appointment) => {
    switch (appointment.status) {
      case AppointmentStatus.COMPLETED:
        usePopup('Lịch hẹn đã hoàn thành', 'error')
        return
      case AppointmentStatus.CHECKED_IN:
        usePopup('Lịch hẹn đã check-in', 'error')
        return
      case AppointmentStatus.CANCELLED:
        usePopup('Lịch hẹn đã hủy', 'error')
        return
    }

    console.log("Check Date",checkDate(appointment.date))

    if (!checkDate(appointment.date)) {
      usePopup('Lịch hẹn đã quá hạn, đã tự động hủy', 'error')
      return
    }
    setIsShowSearch(false)
    setPatientType('new')
    setSearchTerm('')
    setForm((prev) => ({
      ...prev,
      status: 'In-Progress',
      isWalkIn: appointment.isWalkIn,
      patient: appointment.patient,
      doctor_id: appointment.doctor.id,
      appointment_id: appointment.id,
      service: appointment.service.name,
      symptoms: appointment.symptoms,
      specialization: appointment.doctor.specialization.specialization_id
    }))

    form.setFieldsValue({
      serviceType: appointment.service.name,
      specialty: appointment.doctor.specialization.specialization_id,
      description: appointment.symptoms,
      doctor: appointment.doctor.employeeId,
      email: appointment.patient.email
    })
  }
  return (
    <div className="h-full">
      <Form
        form={form}
        name="admission"
        layout="vertical"
        className="flex flex-1 flex-col justify-between px-5 col-span-2"
      >
        <h1 className="text-2xl font-bold mb-4">
          Tiếp nhận bệnh nhân&nbsp;
          <span className="text-primary">DMC</span>
        </h1>

        <div className="grid grid-cols-2 gap-5 justify-center items-center">
          <Form.Item label="Loại Bệnh Nhân" name="patientType">
            <Select
              placeholder="Chọn loại bệnh nhân"
              onChange={handlePatientTypeChange}
              options={patientTypeOptions}
            />
          </Form.Item>
          {
            {
              new: (
                <Form.Item
                  label="Chọn loại dịch vụ khám"
                  name="serviceType"
                  initialValue={'InHour'}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={(e: RadioChangeEvent) =>
                      setForm((prev) => ({ ...prev, service: e.target.value }))
                    }
                  >
                    <Radio.Button value="InHour">Khám Thường</Radio.Button>
                    <Radio.Button value="OutHour">Khám Ngoài Giờ</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              ),
              old: (
                <div className="">
                  <Form.Item label="Tìm kiếm bệnh nhân">
                    <Input
                      placeholder="Nhập số điện thoại, email, tên hoặc mã bệnh nhân"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setIsShowSearch(true)
                      }}
                    />
                  </Form.Item>
                  {searchTerm && isShowSearch && (
                    <PatientSearch searchValue={searchTerm} onClickPatient={selectPatient} />
                  )}
                </div>
              ),
              appointment: (
                <div className="">
                  <Form.Item label="Tìm kiếm lịch hẹn">
                    <Input
                      placeholder="Nhập số điện thoại, email hoặc tên người đặt lịch"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setIsShowSearch(true)
                      }}
                    />
                  </Form.Item>
                  {searchTerm && isShowSearch && (
                    <AppointmentSearch searchValue={searchTerm} onSelected={selectAppointment} />
                  )}
                </div>
              )
            }[patientType]
          }
        </div>

        <Suspense fallback={<div className="loading loading-bars text-primary"></div>}>
          {
            {
              new: <NewPatient form={form} />,
              old: <OldPatient />,
              appointment: <AppointmentPatient onSelected={selectAppointment} />
            }[patientType]
          }
        </Suspense>
      </Form>
    </div>
  )
}
