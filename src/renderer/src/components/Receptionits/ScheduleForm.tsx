import { Radio } from 'antd'
import { CardContent } from '../ui/card'
import { FaRegUser } from 'react-icons/fa6'
import { RiVipDiamondLine } from 'react-icons/ri'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Calendar } from '../ui/calendar'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { appointmentStep } from './states/appointmentStep'

export const ScheduleForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const setStep = useSetRecoilState(appointmentStep)

  return (
    <CardContent>
      <div className="space-y-4">
        <div>
          <div className="grid grid-cols-2 mb-6">
            <Radio.Group defaultValue={'inHour'} buttonStyle="solid" className="col-span-1">
              <Radio.Button value="inHour">Khám trong giờ</Radio.Button>
              <Radio.Button value="outOfHour">Khám ngoài giờ</Radio.Button>
            </Radio.Group>
            <Radio.Group
              defaultValue={'regularConsultation'}
              buttonStyle="solid"
              className="col-span-1"
            >
              <Radio.Button value="regularConsultation">
                <div className="flex items-center">
                  <FaRegUser className="mr-1" />
                  Khám thường
                </div>
              </Radio.Button>
              <Radio.Button value="vipConsultation">
                <div className="flex items-center">
                  <RiVipDiamondLine className="mr-1" />
                  Khám VIP
                </div>
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col w-2/3 col-span-1 mr-2">
              <Label className="mb-2">Bác Sĩ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn Bác Sĩ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-nguyen">Bác Sĩ Nguyễn</SelectItem>
                  <SelectItem value="dr-tran">Bác Sĩ Trần</SelectItem>
                  <SelectItem value="dr-le">Bác Sĩ Lê</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-2/3  col-span-1">
              <Label className="mb-2">Chuyên khoa</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn Chuyên Khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Nội Khoa</SelectItem>
                  <SelectItem value="dentistry">Nha Khoa</SelectItem>
                  <SelectItem value="pediatrics">Nhi Khoa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <Label>Ngày</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div>
          <Label>Thời Gian</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chọn Thời Gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">09:00</SelectItem>
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="11:00">11:00</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea placeholder="Nhập tình trạng sức khỏe" />
        <Input placeholder="Số điện thoại hoặc Tên" />
        <Button className="w-full" onClick={() => setStep(2)}>
          Tiếp Tục
        </Button>
      </div>
    </CardContent>
  )
}
