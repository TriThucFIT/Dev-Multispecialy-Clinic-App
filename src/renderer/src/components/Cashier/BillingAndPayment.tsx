import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export function BillingAndPayment() {
  return (
    <Card className="col-span-2 bg-opacity-90 bg-white">
      <CardHeader>
        <CardTitle>Thanh Toán Hóa Đơn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <span className="font-semibold mr-1">Mã Hóa Đơn:</span>
              <span>0001</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Mã Bệnh Nhân:</span>
              <span>0001</span>
            </div>
          </div>
          <div>
            <span className="font-semibold mr-1">Tên Bệnh Nhân:</span>
            <span>Nguyễn Văn A</span>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="space-y-4">
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
          <Button variant="outline" className="w-full">
            In Hóa Đơn
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
