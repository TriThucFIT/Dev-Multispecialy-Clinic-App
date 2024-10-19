import { Button, DatePicker, DatePickerProps, Form, FormInstance, Input, Radio, Select } from 'antd'
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { useAddress } from '../../hooks/useAddress'
import dayjs, { Dayjs } from 'dayjs'
import { formatDate } from '@renderer/utils/formatDate'
import {
  appointmentSubmitSelector,
  appointmentSubmitState,
  createAppointmentState,
  formValuesState,
  stepState
} from '@renderer/components/Receptionits/Appointment/stores'
import { CreateAppointment } from '@renderer/types/apointment'

export const Step2 = ({ form }: { form: FormInstance }) => {
  const setStep = useSetRecoilState(stepState)
  const [districts, setDistricts] = useState([])
  const { citys, fetchAddressData, fetchDistrictData } = useAddress()
  const [formValues, setFormValues] = useRecoilState(formValuesState)

  // Submit appointment form
  const createValue = useRecoilValueLoadable(appointmentSubmitSelector)
  const [appointmentSubmit, setAppointmentSubmit] = useRecoilState(appointmentSubmitState)
  const setCreateAppointment = useSetRecoilState(createAppointmentState)

  useEffect(() => {
    fetchAddressData()
  }, [])

  useEffect(() => {
    if (formValues.patient) {
      form.setFieldsValue({
        name: formValues.patient?.fullName,
        email: formValues.patient?.email,
        gender: formValues.patient?.gender,
        address: formValues.patient?.address?.address,
        city: formValues.patient?.address?.city,
        district: formValues.patient?.address?.state,
        date: formValues.patient?.dob ? dayjs(formValues.patient.dob) : undefined
      })
    }
  }, [formValues])

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
    if (!(createValue && appointmentSubmit)) {
      setCreateAppointment({ ...formValues, isWalkIn: true } as CreateAppointment)
      setAppointmentSubmit(true)
    }
  }

  useEffect(() => {
    if (createValue.state === 'hasValue' && appointmentSubmit) {
      setStep(1)
      setAppointmentSubmit(false)
      setCreateAppointment(null)
      form.resetFields()
    }
  }, [createValue])

  return (
    <div className="bg-white bg-opacity-65 shadow-2xl rounded-2xl p-3">
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
          onChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              patient: { ...prev.patient, fullName: e.target.value }
            }))
          }}
        />
      </Form.Item>
      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Ngày sinh" name="date" required>
          <DatePicker
            format={'DD/MM/YYYY'}
            className="w-full"
            onChange={handleSelectDob}
            allowClear={false}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          tooltip="Nhập email để nhận được các thông báo về lịch hẹn, tái khám,..."
          rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
        >
          <Input
            placeholder="Nhập email"
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
      <div className="grid grid-cols-2 gap-5">
        <Button className="w-full" onClick={() => setStep(1)}>
          Quay lại
        </Button>
        <Button
          type="primary"
          className="w-full"
          onClick={handleSubmit}
          loading={createValue.state === 'loading'}
        >
          Đăng ký
        </Button>
      </div>
    </div>
  )
}
