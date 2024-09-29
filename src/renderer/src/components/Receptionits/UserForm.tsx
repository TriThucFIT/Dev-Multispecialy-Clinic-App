import { DatePicker, Input, Radio } from 'antd'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useSetRecoilState } from 'recoil'
import { appointmentStep } from './states/appointmentStep'
import { CardContent } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useAddress } from '@renderer/hooks/useAddress'
import { useEffect } from 'react'

export const UserForm = () => {
  const { city, fetchAddressData } = useAddress()
  const setStep = useSetRecoilState(appointmentStep)

  useEffect(() => {
    fetchAddressData()
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <CardContent>
          <Label>Họ và tên</Label>
          <Input placeholder="Nhập họ và tên" />
        </CardContent>
        <CardContent>
          <Label>Ngày sinh</Label>
          <DatePicker format={'DD/MM/YYYY'} className="w-full" />
        </CardContent>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <CardContent>
          <Label>Email</Label>
          <Input placeholder="Nhập email" />
        </CardContent>
        <CardContent className="flex items-center">
          <Label className="mr-2">Giới tính</Label>
          <Radio.Group>
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
        <Input placeholder="Nhập địa chỉ" />
      </CardContent>
      <CardContent className="grid grid-cols-2 gap-5">
        <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
          Quay lại
        </Button>
        <Button className="w-full">Đăng ký</Button>
      </CardContent>
    </>
  )
}
