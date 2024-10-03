import { useState, useEffect, startTransition } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useRecoilState } from 'recoil'
import { phoneInputState, appointmentByPatient } from './states/appointmentStep'
import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'

export function PatientRegistration() {
  const [isNewPatient, setIsNewPatient] = useState('new')
  const [phoneInput, setPhoneInput] = useRecoilState(phoneInputState)
  const [appointment, setAppointment] = useRecoilState(appointmentByPatient)
  const [loading, setLoading] = useState(false)

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
    AppointmentService.registrationPatient({
      name: appointment?.patient?.fullName,
      dob: appointment?.patient?.dob,
      gender: appointment?.patient?.gender ? 'nữ' : 'name',
      phone: appointment?.patient?.phone,
      serviceType: appointment?.service?.description,
      serviceLeval: 'Normal',
      specialist: appointment?.doctor?.specialization,
      symptoms: appointment?.symptoms
    })
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
                  <Input placeholder="Họ và Tên" />
                  <Input type="date" placeholder="Ngày Sinh" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Giới Tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Số Điện Thoại" />
                </>
              ) : (
                <Input placeholder="Mã Bệnh Nhân hoặc Số Điện Thoại" />
              )}
              <div className="flex">
                <Select>
                  <SelectTrigger className="mr-5">
                    <SelectValue placeholder="Dịch vụ khám" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intime">Trong Giờ</SelectItem>
                    <SelectItem value="overtime">Ngoài Giờ</SelectItem>
                    <SelectItem value="emergency">Cấp cứu</SelectItem>
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn Khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Khoa Tổng Quát</SelectItem>
                  <SelectItem value="cardiology">Khoa Tim Mạch</SelectItem>
                  <SelectItem value="neurology">Khoa Thần Kinh</SelectItem>
                  <SelectItem value="pediatrics">Khoa Nhi</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Miêu tả sơ bộ các triệu chứng" />
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
