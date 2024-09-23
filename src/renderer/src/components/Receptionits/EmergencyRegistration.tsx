import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export function EmergencyRegistration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng Ký Cấp Cứu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Tên Bệnh Nhân (nếu biết)" />
          <Input placeholder="Tuổi Ước Tính" type="number" />
          <Textarea placeholder="Mô Tả Ngắn Gọn Tình Trạng Cấp Cứu" />
          <Button className="w-full">Đăng Ký Cấp Cứu</Button>
        </div>
      </CardContent>
    </Card>
  )
}