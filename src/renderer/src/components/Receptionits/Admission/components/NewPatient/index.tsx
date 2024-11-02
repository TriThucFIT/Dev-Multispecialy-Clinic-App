import { Button, DatePicker, DatePickerProps, Form, FormInstance, Input, Radio, Select } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

import { FC, Suspense, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import {
  doctorSelector,
  specializationSelector,
  admissionSubmitState,
  admissionSubmitSelector,
  formValuesAdmisionState
} from '../../stores'

import TextArea from 'antd/es/input/TextArea'
import { useAddress } from '@renderer/components/Receptionits/Appointment/hooks/useAddress'
import { formatDate } from '@renderer/utils/formatDate'
import { usePopup } from '@renderer/hooks/usePopup'

interface NewPatientProps {
  form: FormInstance
}

export const NewPatient: FC<NewPatientProps> = ({ form }) => {
  const specializations = useRecoilValue(specializationSelector)
  const doctorList = useRecoilValue(doctorSelector)
  const [specializationList, setSpecializationList] = useState<{ label: string; value: string }[]>(
    []
  )
  const [doctorData, setDoctorData] = useState<
    { label: string; value: string; specialization: string }[]
  >([])
  const gridClasses = 'grid grid-cols-2 gap-5'
  const [districts, setDistricts] = useState([])
  const { citys, fetchAddressData, fetchDistrictData } = useAddress()

  // Admission form values and submit
  const [formValues, setFormValues] = useRecoilState(formValuesAdmisionState)
  const [admissionSubmit, setAdmissionSubmit] = useRecoilState(admissionSubmitState)
  const createValue = useRecoilValueLoadable(admissionSubmitSelector)

  useEffect(() => {
    fetchAddressData()
    if (!formValues.service) {
      setFormValues((prev) => ({ ...prev, service: 'InHour' }))
    }
  }, [])

  useEffect(() => {
    const specializationsList = specializations.map((specialization) => ({
      label: specialization.name,
      value: specialization.specialization_id
    }))
    setSpecializationList(specializationsList)
  }, [specializations])

  useEffect(() => {
    if (doctorList.length) {
      const doctorFilter = doctorList.map((doctor) => ({
        label: doctor.fullName,
        value: doctor.employeeId,
        specialization: doctor.specialization.specialization_id
      }))
      setDoctorData(doctorFilter)
    }
  }, [doctorList])

  useEffect(() => {
    if (formValues.patient) {
      form.setFieldsValue({
        phone: formValues.patient?.phone,
        name: formValues.patient?.fullName,
        email: formValues.patient?.email,
        gender: formValues.patient?.gender,
        address: formValues.patient?.address?.address,
        city: formValues.patient?.address?.city,
        district: formValues.patient?.address?.state,
        date: formValues.patient?.dob ? [dayjs(formValues.patient.dob)] : undefined
      })
    }
  }, [formValues])

  const handleSelectSpecialty = (value: string) => {
    form.setFieldsValue({ doctor: undefined })
    const doctorFilter = doctorList
      .filter((doctor) => {
        return doctor.specialization.specialization_id === value
      })
      .map((doctor) => ({
        label: doctor.fullName,
        value: doctor.employeeId,
        specialization: doctor.specialization.specialization_id
      }))
    setDoctorData(doctorFilter)
    setFormValues((prev) => ({ ...prev, specialization: value, doctor_id: undefined }))
    form.setFieldsValue({ specialty: value })
  }

  const handleSelectDoctor = (value: string) => {
    const doctor = doctorList.find((doctor) => doctor.employeeId === value)
    if (doctor) {
      setFormValues((prev) => ({
        ...prev,
        doctor_id: doctor.id,
        specialization: doctor.specialization.specialization_id
      }))
      form.setFieldsValue({ doctor: value, specialty: doctor.specialization.specialization_id })
    }
  }
  const handleChangePhone = (e: any) => {
    form.setFieldsValue({ phone: e.target.value })
    setFormValues((prev: any) => ({ ...prev, patient: { ...prev.patient, phone: e.target.value } }))
  }

  const handleSelectCity = async (value: string, option: any) => {
    const data = await fetchDistrictData(value)
    if (data) {
      setDistricts(data)
      setFormValues((prev) => ({
        ...prev,
        patient: { ...prev.patient, address: { ...prev.patient.address, city: option.label } }
      }))
      form.setFieldsValue({ district: undefined })
    }
  }

  const handleDistrictChange = (value: string, option: any) => {
    setFormValues((prev) => ({
      ...prev,
      patient: { ...prev.patient, address: { ...prev.patient.address, state: option.label } }
    }))

    form.setFieldsValue({ district: value })
  }

  const handleSelectDob: DatePickerProps<Dayjs[]>['onChange'] = (_date, dateString) => {
    setFormValues((prev) => ({
      ...prev,
      patient: { ...prev.patient, dob: formatDate(dateString as string) }
    }))
  }
  const handleSubmit = () => {
    if (admissionSubmit) {
      setAdmissionSubmit(false)
    }
    form.validateFields().then(() => {
      setAdmissionSubmit(true)
    })
  }

  useEffect(() => {
    if (createValue.state === 'loading') {
      usePopup('Đang xử lý', 'loading')
    }
    if (createValue.state === 'hasError') {
      if (createValue.contents?.response?.data?.message_VN) {
        usePopup(createValue.contents.response.data.message_VN, 'error')
      } else {
        usePopup('Đăng ký thất bại', 'error')
      }
      setAdmissionSubmit(false)
    }

    if (createValue.state === 'hasValue' && admissionSubmit) {
      usePopup('Đăng ký thành công', 'success')
      setAdmissionSubmit(false)
      form.resetFields()
      setFormValues({} as any)
    }
  }, [createValue])
  return (
    <div className="bg-white bg-opacity-65 shadow-2xl rounded-2xl p-3">
      <div className={gridClasses}>
        <Form.Item
          label="Chọn chuyên khoa"
          name="specialty"
          rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa' }]}
        >
          <Suspense fallback={<Select loading />}>
            <Select
              showSearch
              placeholder="Chọn chuyên khoa"
              optionFilterProp="label"
              value={formValues.specialization}
              options={specializationList}
              onChange={handleSelectSpecialty}
            />
          </Suspense>
        </Form.Item>
        <Form.Item label="Chọn bác sĩ" name="doctor">
          <Suspense fallback={<Select loading />}>
            <Select
              showSearch
              placeholder="Chọn bác sĩ"
              optionFilterProp="label"
              value={form.getFieldValue('doctor')}
              options={doctorData}
              onChange={handleSelectDoctor}
            />
          </Suspense>
        </Form.Item>
      </div>

      <Form.Item
        label="Nhập vấn đề sức khỏe cần khám"
        name="description"
        rules={[{ required: true, message: 'Vui lòng mô tả tình trạng bệnh nhân' }]}
      >
        <TextArea
          showCount
          maxLength={200}
          placeholder="Nhập tình trạng sức khoẻ của bạn, câu hỏi dành cho bác sĩ và các vấn đề sức khỏe cần khám"
          onChange={(e) => setFormValues((prev) => ({ ...prev, symptoms: e.target.value }))}
        />
      </Form.Item>

      <div className={gridClasses}>
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            {
              required: true,
              message: 'Họ và tên không được để trống'
            }
          ]}
        >
          <Input
            placeholder="Nhập họ và tên"
            value={formValues.patient?.fullName}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                patient: { ...prev.patient, fullName: e.target.value }
              }))
            }}
          />
        </Form.Item>
        <Form.Item label="Ngày sinh" name="date" required>
          <DatePicker
            value={formValues.patient?.dob ? [dayjs(formValues.patient?.dob)] : undefined}
            format={'DD/MM/YYYY'}
            className="w-full"
            onChange={handleSelectDob}
            allowClear={false}
          />
        </Form.Item>
      </div>

      <div className={gridClasses}>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại'
            },
            {
              pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
              message: 'Số điện thoại không hợp lệ'
            }
          ]}
        >
          <Input placeholder="Nhập số điện thoại" onChange={handleChangePhone} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          tooltip="Nhập email để nhận được các thông báo về lịch hẹn, tái khám,..."
          rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
        >
          <Input
            placeholder="Nhập email"
            value={formValues.patient?.email}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                patient: { ...prev.patient, email: e.target.value }
              }))
            }}
          />
        </Form.Item>
      </div>

      <div className="flex">
        <Form.Item label="Giới tính" name="gender" required layout="horizontal">
          <Radio.Group
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                patient: { ...prev.patient, gender: e.target.value }
              }))
            }}
          >
            <Radio value={false}>Nữ</Radio>
            <Radio value={true}>Nam</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Tỉnh/Thành phố" name="city" required>
          <Select
            showSearch
            placeholder="Chọn tỉnh/thành phố"
            optionFilterProp="label"
            options={citys}
            onChange={handleSelectCity}
          ></Select>
        </Form.Item>
        <Form.Item label="Quận/Huyện" name="district" required>
          <Select
            showSearch
            placeholder="Chọn quận/huyện"
            optionFilterProp="label"
            options={districts}
            onChange={handleDistrictChange}
            notFoundContent="Không tìm thấy quận/huyện"
            allowClear
          ></Select>
        </Form.Item>
      </div>
      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[
          {
            required: true,
            message: 'Địa chỉ không được để trống'
          }
        ]}
      >
        <Input
          placeholder="Nhập địa chỉ cụ thể. Ví dụ: 123/4 Lê Lợi, P. Bến Thành, Q.1"
          onChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              patient: {
                ...prev.patient,
                address: {
                  ...prev.patient?.address,
                  address: e.target.value
                }
              }
            }))
          }}
        />
      </Form.Item>
      <div className="flex justify-end mt-3">
        <Button type="primary" className="w-full my-5" onClick={handleSubmit}>
          Tiếp tục
        </Button>
      </div>
    </div>
  )
}
