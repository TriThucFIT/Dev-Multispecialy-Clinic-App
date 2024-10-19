import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  TimePicker,
  TimePickerProps
} from 'antd'
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker'
import TextArea from 'antd/es/input/TextArea'
import dayjs, { Dayjs } from 'dayjs'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Suspense, useEffect, useState } from 'react'
import { formatDate } from '@renderer/utils/formatDate'
import { doctorSelector, specializationSelector } from '@renderer/states/doctor'
import { Patient } from '@renderer/types/Patient/patient'
import { PatientSearch } from '@renderer/components/PatientSearch'
import { formValuesState, stepState } from '../../stores'

export const Step1 = ({ form }: { form: FormInstance }) => {
  const setStep = useSetRecoilState(stepState)
  const setForm = useSetRecoilState(formValuesState)
  const specializations = useRecoilValue(specializationSelector)
  const doctorList = useRecoilValue(doctorSelector)

  const [specializationList, setSpecializationList] = useState<{ label: string; value: string }[]>(
    []
  )
  const [doctorData, setDoctorData] = useState<
    { label: string; value: string; specialization: string }[]
  >([])

  const [phoneNumber, setPhoneNumber] = useState('')
  const [isShowSearch, setIsShowSearch] = useState(false)

  const gridClasses = 'grid grid-cols-2 gap-5'
  const disableHours: number[] = [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23]

  const formValues = useRecoilValue(formValuesState)
  useEffect(() => {
    console.log('formValues', formValues)
  }, [formValues])

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

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const today = dayjs().endOf('day')
    const maxDate = dayjs().add(15, 'day').endOf('day')
    return current < today || current > maxDate
  }

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
    setForm((prev) => ({ ...prev, specialty: value }))
    form.setFieldsValue({ specialty: value })
  }

  const handleSelectDoctor = (value: string) => {
    const doctor = doctorList.find((doctor) => doctor.employeeId === value)
    if (doctor) {
      setForm((prev) => ({
        ...prev,
        doctor: {
          name: doctor.fullName,
          specialization: doctor.specialization.specialization_id
        }
      }))
      form.setFieldsValue({ doctor: value })
    }
  }

  const handleDateAppointment: DatePickerProps<Dayjs[]>['onChange'] = (_date, dateString) => {
    setForm((prev) => ({
      ...prev,
      date: formatDate(dateString as string)
    }))
  }

  const handleTimeAppointment: TimePickerProps['onChange'] = (_time, timeString) => {
    setForm((prev) => ({ ...prev, time: timeString as string }))
  }

  const selectPatient = (patient: Patient) => {
    form.setFieldsValue({ phone: patient.phone })
    setIsShowSearch(false)
    setForm((prev) => ({ ...prev, patient }))
  }
  const handleCheckNextStep = () => {
    form.validateFields().then((value) => {
      if (!formValues.patient) {
        setForm((prev) => ({ ...prev, patient: { phone: value.phone } }))
      }
      if (!formValues.service) {
        setForm((prev) => ({ ...prev, service: value.serviceType }))
      }
      setStep(2)
    })
  }
  return (
    <div className="bg-white bg-opacity-65 shadow-2xl rounded-2xl p-3">
      <div className={gridClasses}>
        <Form.Item
          label="Chọn loại dịch vụ khám"
          name="serviceType"
          initialValue={'InHour'}
          required
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
        <div className="">
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
            <Input
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                setIsShowSearch(true)
              }}
            />
          </Form.Item>
          {phoneNumber.length > 5 && isShowSearch && (
            <PatientSearch
              phoneOnly={true}
              key={phoneNumber}
              searchValue={phoneNumber}
              onClickPatient={selectPatient}
            />
          )}
        </div>
      </div>

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
              value={form.getFieldValue('specialty')}
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

      <div className={gridClasses}>
        <Form.Item
          label="Chọn ngày muốn khám"
          name="dateAppointment"
          rules={[{ required: true, message: 'Vui lòng chọn ngày khám' }]}
        >
          <DatePicker
            format={'DD/MM/YYYY'}
            disabledDate={disabledDate}
            className="w-full"
            onChange={handleDateAppointment}
          />
        </Form.Item>
        <Form.Item
          label="Chọn giờ muốn khám"
          name="timeAppointment"
          rules={[{ required: true, message: 'Vui lòng chọn giờ khám' }]}
        >
          <TimePicker
            format={'HH:mm'}
            minuteStep={15}
            disabledTime={() => ({
              disabledHours: () => disableHours
            })}
            hideDisabledOptions
            className="w-full"
            onChange={handleTimeAppointment}
          />
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
          onChange={(e) => setForm((prev) => ({ ...prev, symptoms: e.target.value }))}
        />
      </Form.Item>

      <div className="flex justify-end mt-3">
        <Button type="primary" className="w-full my-5" onClick={handleCheckNextStep}>
          Tiếp tục
        </Button>
      </div>
    </div>
  )
}
