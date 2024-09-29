import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export function PatientRegistration() {
  const [isNewPatient, setIsNewPatient] = useState('new')

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
            <Input placeholder="Mã Bệnh Nhân hoặc Số Điện Thoại" />
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
              <>
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
                      <SelectItem value="normal">Khám thuòng</SelectItem>
                      <SelectItem value="vip">Khám dịch vụ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>

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
          <Button className="w-full">Đăng Ký Bệnh Nhân</Button>
        </div>
      </CardContent>
    </Card>
  )
}
