import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Calendar } from "../ui/calendar"

export function AppointmentScheduling() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lên Lịch Hẹn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Bác Sĩ</Label>
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
          <Input placeholder="Mã Bệnh Nhân hoặc Tên" />
          <Button className="w-full">Đặt Lịch Hẹn</Button>
        </div>
      </CardContent>
    </Card>
  )
}