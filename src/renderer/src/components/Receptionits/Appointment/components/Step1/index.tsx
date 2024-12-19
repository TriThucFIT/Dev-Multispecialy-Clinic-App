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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Suspense, useEffect, useState } from 'react'
import { formatDate } from '@renderer/utils/formatDate'
import { Patient } from '@renderer/types/Patient/patient'
import { PatientSearch } from '@renderer/components/PatientSearch'
import { formValuesState, iShowSearchCompnent, stepState } from '../../stores'
import { doctorSelector, specializationSelector } from '@renderer/components/Doctors/stores'

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
  const [isShowSearch, setIsShowSearch] = useRecoilState(iShowSearchCompnent)

  const gridClasses = 'grid grid-cols-2 gap-5'
  // const [disableHours, setDisableHours] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23])

  const [disableInHours, setDisableInHours] = useState([
    0, 1, 2, 3, 4, 5, 6, 18, 19, 20, 21, 22, 23
  ])
  const disbaleOutHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 22, 23]

  const formValues = useRecoilValue(formValuesState)

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
    return current < today.subtract(1, 'day') || current > maxDate
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
    const date = dayjs(formatDate(dateString as string))
    if (date.isSame(dayjs(), 'day')) {
      let currentHour = dayjs().hour() + 1
      const currentMinute = dayjs().minute()
      if (currentMinute > 45) {
        currentHour++
      }
      const hoursToDisable = Array.from({ length: currentHour }, (_, i) => i)
      setDisableInHours((prev) => [...new Set([...prev, ...hoursToDisable])])
    } else {
      setDisableInHours([0, 1, 2, 3, 4, 5, 6, 18, 19, 20, 21, 22, 23])
    }
    setForm((prev) => ({
      ...prev,
      date: formatDate(dateString as string)
    }))
  }

  const handleTimeAppointment: TimePickerProps['onChange'] = (_time, timeString) => {
    if (!timeString) {
      setForm((prev) => ({ ...prev, time: '' }))
      return
    }

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
        <div className="flex items-center justify-betweenF">
          <Form.Item
            label="Loại dịch vụ khám"
            name="serviceType"
            initialValue={formValues.service || 'InHour'}
          >
            <Radio.Group
              buttonStyle="solid"
              defaultValue={formValues.service || 'InHour'}
              onChange={(e: RadioChangeEvent) => {
                setForm((prev) => ({ ...prev, service: e.target.value, time: null }))
                form.setFieldsValue({ timeAppointment: null })
              }}
            >
              <Radio.Button value="InHour">
                <span>Khám thường</span>
              </Radio.Button>
              <Radio.Button value="OutHour">
                <span>Khám Ngoài Giờ</span>
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Button type="dashed" className="ml-5 mt-2">
            {formValues.service
              ? formValues.service === 'InHour'
                ? '100.000đ'
                : '150.000đ'
              : '100.000đ'}
          </Button>
        </div>

        <div className="">
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại'
              },
              ...(phoneNumber.length == 10
                ? [
                    {
                      pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
                      message: 'Số điện thoại không hợp lệ'
                    }
                  ]
                : [])
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
          {phoneNumber.length > 5 && !isShowSearch && !selectPatient && (
            <div className="text-red-500 text-sm -mt-4 mb-2">Không tìm thấy bệnh nhân</div>
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
              disabledHours: () => {
                return formValues.service === 'InHour' ? disableInHours : disbaleOutHours
              }
            })}
            hideDisabledOptions
            className="w-full"
            showNow={false}
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
