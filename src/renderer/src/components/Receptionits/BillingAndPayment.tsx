import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export function BillingAndPayment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thanh Toán và Hóa Đơn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Mã Bệnh Nhân hoặc Tên" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dịch Vụ</TableHead>
                <TableHead>Số Tiền</TableHead>
                <TableHead>Trạng Thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Khám Bệnh</TableCell>
                <TableCell>500.000 VNĐ</TableCell>
                <TableCell>Chưa Thanh Toán</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Xét Nghiệm</TableCell>
                <TableCell>300.000 VNĐ</TableCell>
                <TableCell>Chưa Thanh Toán</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <Label>Phương Thức Thanh Toán</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn Phương Thức Thanh Toán" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Tiền Mặt</SelectItem>
                <SelectItem value="card">Thẻ Tín Dụng/Ghi Nợ</SelectItem>
                <SelectItem value="insurance">Bảo Hiểm</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">Xử Lý Thanh Toán</Button>
          <Button variant="outline" className="w-full">In Hóa Đơn</Button>
        </div>
      </CardContent>
    </Card>
  )
}