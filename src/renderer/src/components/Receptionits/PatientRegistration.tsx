import { useState, useEffect, startTransition, Suspense } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  phoneInputState,
  appointmentByPatient,
} from './Appointment/stores'
import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'
import {
  specializationSelector,
  specializationsState
} from '@renderer/states/doctor'
import { GrCertificate } from 'react-icons/gr'
import { DatePicker } from 'antd'
import moment from 'moment'

export function PatientRegistration() {
  const [isNewPatient, setIsNewPatient] = useState('new')
  const [phoneInput, setPhoneInput] = useRecoilState(phoneInputState)
  const [appointment, setAppointment] = useRecoilState(appointmentByPatient)
  const [loading, setLoading] = useState(false)
  const thisUser = JSON.parse(localStorage.getItem('user_login') || 'null')

  const [fullName, setFullName] = useState<string>('')
  const [service, setService] = useState('inHour')
  const [dob, setDob] = useState(new Date())
  const [phone, setPhone] = useState<string>('')
  const [gender, setGender] = useState<boolean>(true)
  const [symptoms, setSymptoms] = useState<string>('')
  const [specialization, setSpecialization] = useState<string>('')
  useEffect(() => {
    if (phoneInput && isNewPatient === 'appointment') {
      setLoading(true)
      startTransition(() => {
        AppointmentService.getAppointmentByPatient(phoneInput)
          .then((appointment) => {
            setAppointment(appointment.data)
            console.log(appointment)
          })
          .finally(() => {
            setLoading(false)
          })
      })
    }
  }, [phoneInput, isNewPatient])

  const handleRegisterPatient = () => {
    if (isNewPatient === 'new') {
      AppointmentService.registrationPatient({
        status: 'pending',
        isWalkIn: true,
        patient: {
          fullName: appointment?.patient?.fullName,
          email: appointment?.patient?.email,
          phone: appointment?.patient?.phone,
          address: appointment?.patient.address,
          gender: appointment?.patient.gender,
          dob: appointment?.patient.dob
        },
        doctor_id: appointment?.doctor.id,
        appointment_id: appointment?.id,
        service: appointment?.service.id,
        symptoms: appointment.symptoms,
        specialization: appointment?.doctor.specialization
      })
    }
    if (isNewPatient === 'appointment') {
      AppointmentService.registrationPatient({
        status: 'pending',
        isWalkIn: true,
        patient: {
          fullName: appointment?.patient?.fullName,
          email: appointment?.patient?.email,
          phone: appointment?.patient?.phone,
          address: appointment?.patient.address,
          gender: appointment?.patient.gender,
          dob: appointment?.patient.dob
        },
        doctor_id: appointment?.doctor.id,
        appointment_id: appointment?.id,
        service: appointment?.service.id,
        symptoms: appointment.symptoms,
        specialization: appointment?.doctor.specialization
      })

      setAppointment(null)
    }
  }

  return (
    <Card className="bg-white bg-opacity-90">
      <CardHeader>
        <CardTitle>Đăng Ký Bệnh Nhân</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Loại Bệnh Nhân</Label>
            <Select onValueChange={(value) => setIsNewPatient(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại bệnh nhân" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Bệnh Nhân Mới</SelectItem>
                <SelectItem value="returning">Bệnh Nhân Cũ</SelectItem>
                <SelectItem value="appointment">Có Lịch Hẹn</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isNewPatient === 'appointment' ? (
            <>
              <Input
                placeholder="Mã Bệnh Nhân hoặc Số Điện Thoại"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
              {appointment && (
                <>
                  <Input placeholder="Họ và Tên" value={appointment?.patient?.fullName} />
                  <Input
                    type="date"
                    placeholder="Ngày Sinh"
                    value={new Date(appointment?.patient?.dob).toISOString().split('T')[0]}
                  />
                  <Select value={appointment?.patient?.gender ? 'female' : 'male'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Giới Tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Số Điện Thoại" value={appointment?.patient?.phone} />
                  <div className="flex">
                    <Input value={appointment?.service?.description} />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Loại hình khám" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Khám thường</SelectItem>
                        <SelectItem value="vip">Khám dịch vụ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={appointment?.doctor?.specialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn Khoa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">Khoa Tổng Quát</SelectItem>
                      <SelectItem value="Cardiology">Khoa Tim Mạch</SelectItem>
                      <SelectItem value="Neurology">Khoa Thần Kinh</SelectItem>
                      <SelectItem value="Pediatrics">Khoa Nhi</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex flex-col w-full col-span-1">
                    <Suspense
                      fallback={<div className="loading loading-spinner text-primary"></div>}
                    >
                      <SpecializationSelect
                        setSpecializationSelected={setSpecialization}
                        value={appointment?.doctor?.specialization ?? specialization}
                      />
                    </Suspense>
                  </div>
                  <Textarea
                    placeholder="Miêu tả sơ bộ các triệu chứng"
                    value={appointment?.symptoms}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {isNewPatient === 'new' ? (
                <>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Họ và Tên"
                  />
                  {/* <Input
                    value={new Date(dob).toISOString().split('T')[0]}
                    onChange={(e) => setDob(new Date(e.target.value).toISOString().split('T')[0])}
                    type="date"
                    placeholder="Ngày Sinh"
                  /> */}
                  <DatePicker
                    value={dob ? moment(new Date(dob)) : undefined}
                    onChange={(date) => setDob(date ? new Date(date.toISOString()) : new Date())}
                    format={'YYYY-MM-DD'}
                    className="w-full"
                  />
                  <Select
                    value={gender ? 'male' : 'female'}
                    onValueChange={(value) => setGender(value === 'male' ? true : false)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Giới Tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Số Điện Thoại"
                  />
                </>
              ) : (
                <Input placeholder="Mã Bệnh Nhân hoặc Số Điện Thoại" />
              )}
              <div className="flex">
                <Select value={service} onValueChange={(value) => setService(value)}>
                  <SelectTrigger className="mr-5">
                    <SelectValue placeholder="Dịch vụ khám" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="InHour">Trong Giờ</SelectItem>
                    <SelectItem value="OutHour">Ngoài Giờ</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Loại hình khám" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Khám thường</SelectItem>
                    <SelectItem value="vip">Khám dịch vụ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn Khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Khoa Tổng Quát</SelectItem>
                  <SelectItem value="cardiology">Khoa Tim Mạch</SelectItem>
                  <SelectItem value="neurology">Khoa Thần Kinh</SelectItem>
                  <SelectItem value="pediatrics">Khoa Nhi</SelectItem>
                </SelectContent>
              </Select> */}
              <div className="flex flex-col w-full col-span-1">
                <Label className="mb-2">Chuyên khoa</Label>
                <Suspense fallback={<div className="loading loading-spinner text-primary"></div>}>
                  <SpecializationSelect
                    setSpecializationSelected={setSpecialization}
                    value={specialization}
                  />
                </Suspense>
              </div>
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Miêu tả sơ bộ các triệu chứng"
              />
            </>
          )}
          <Button className="w-full" onClick={handleRegisterPatient}>
            {loading ? 'Đang tải...' : 'Đăng Ký Bệnh Nhân'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export const SpecializationSelect = ({ setSpecializationSelected, value }) => {
  const specializations = useRecoilValue(specializationSelector)
  const setSpecializationsState = useSetRecoilState(specializationsState)

  useEffect(() => {
    if (specializations.length === 0) {
      setSpecializationsState(specializations)
    }
  }, [specializations])

  return (
    <Select
      onValueChange={(value) => {
        setSpecializationSelected(value)
      }}
      value={value}
    >
      <SelectTrigger>
        <SelectValue placeholder="Chọn Chuyên Khoa" />
      </SelectTrigger>
      <SelectContent>
        {specializations?.map((specialization) => (
          <SelectItem key={specialization.specialization_id} value={specialization.specialization_id}>
            <div className="flex">
              <GrCertificate color="#299ec4" size={18} />
              <span className="ml-2">{specialization.specialization_id}</span>
              <span className="ml-2">{specialization.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
