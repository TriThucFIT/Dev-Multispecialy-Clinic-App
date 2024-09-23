import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function QueueManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quản Lý Hàng Đợi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Số Thứ Tự</TableHead>
                <TableHead>Tên Bệnh Nhân</TableHead>
                <TableHead>Thời Gian Chờ Ước Tính</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>A001</TableCell>
                <TableCell>Trần Thị B</TableCell>
                <TableCell>15 phút</TableCell>
                <TableCell>Đang Chờ</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Gọi Tiếp Theo</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>A002</TableCell>
                <TableCell>Lê Văn C</TableCell>
                <TableCell>30 phút</TableCell>
                <TableCell>Đang Chờ</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Gọi Tiếp Theo</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-between">
            <Button variant="outline">Làm Mới Hàng Đợi</Button>
            <Button>Thông Báo Bệnh Nhân Tiếp Theo</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}