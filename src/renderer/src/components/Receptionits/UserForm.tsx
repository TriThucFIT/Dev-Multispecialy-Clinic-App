import { DatePicker, Input, Radio } from 'antd'
import moment from 'moment'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  appointmentStep,
  appointmentSubmitSelector,
  appointmentSubmitState,
  createAppointmentState,
  phoneInputPatientState
} from './states/appointmentStep'
import { CardContent } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useAddress } from '@renderer/hooks/useAddress'
import { useEffect } from 'react'
import { patientByPhone } from '@renderer/states/doctor'

export const UserForm = () => {
  const { city, fetchAddressData } = useAddress()
  const setStep = useSetRecoilState(appointmentStep)
  const phonePatient = useRecoilValue(phoneInputPatientState)
  const [patient, setpatient] = useRecoilState(patientByPhone)
  const setAppointmentSubmit = useSetRecoilState(appointmentSubmitState)
  const setCreateAppointment = useSetRecoilState(createAppointmentState)
  useRecoilValue(appointmentSubmitSelector)
  const handleCreateAppointment = () => {
    setCreateAppointment((prev) => {
      return {
        ...prev,
        patient: {
          fullName: patient?.fullName,
          email: patient?.email,
          phone: patient?.phone || phonePatient,
          address: patient?.address,
          gender: patient?.gender,
          dob: patient?.dob
        }
      }
    })

    setAppointmentSubmit(true)
  }

  useEffect(() => {
    fetchAddressData()
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <CardContent>
          <Label>Họ và tên</Label>
          <Input
            value={patient?.fullName}
            onChange={(e) => setpatient({ ...patient, fullName: e.target.value })}
            placeholder="Nhập họ và tên"
          />
        </CardContent>
        <CardContent>
          <Label>Ngày sinh</Label>
          <DatePicker
            value={patient?.dob ? moment(new Date(patient.dob)) : undefined}
            onChange={(date) => setpatient({ ...patient, dob: date?.format('YYYY-MM-DD') })}
            format={'YYYY-MM-DD'}
            className="w-full"
          />
        </CardContent>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <CardContent>
          <Label>Email</Label>
          <Input
            value={patient?.email}
            onChange={(e) => setpatient({ ...patient, email: e.target.value })}
            placeholder="Nhập email"
          />
        </CardContent>
        <CardContent className="flex items-center">
          <Label className="mr-2">Giới tính</Label>
          <Radio.Group
            value={patient?.gender ? 'female' : 'male'}
            onChange={(e) =>
              setpatient({
                ...patient,
                gender: e.target.value === 'female'
              })
            }
          >
            <Radio value="female">Nữ</Radio>
            <Radio value="male">Nam</Radio>
          </Radio.Group>
        </CardContent>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <CardContent>
          <Label>Tỉnh/Thành phố</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chọn tỉnh/thành phố" />
            </SelectTrigger>
            <SelectContent>
              {city.map((item) => (
                <SelectItem key={item?.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardContent>
          <Label>Quận/Huyện</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chọn quận/huyện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HCM">Thành phố Hồ Chí Minh</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </div>
      <CardContent>
        <Label>Địa chỉ</Label>
        <Input
          value={patient?.address}
          onChange={(e) => setpatient({ ...patient, address: e.target.value })}
          placeholder="Nhập địa chỉ"
        />
      </CardContent>
      <CardContent className="grid grid-cols-2 gap-5">
        <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
          Quay lại
        </Button>
        <Button onClick={handleCreateAppointment} className="w-full">
          Đăng ký
        </Button>
      </CardContent>
    </>
  )
}
