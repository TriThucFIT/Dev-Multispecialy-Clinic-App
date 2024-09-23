import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export function PatientLookup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tra Cứu Bệnh Nhân</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input placeholder="Mã Bệnh Nhân, Tên, hoặc Số Điện Thoại" className="flex-grow" />
            <Button>Tìm Kiếm</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Số Điện Thoại</TableHead>
                <TableHead>Lần Khám Gần Nhất</TableHead>
                <TableHead>Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>001</TableCell>
                <TableCell>Nguyễn Văn A</TableCell>
                <TableCell>0123456789</TableCell>
                <TableCell>15/05/2023</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Xem Chi Tiết</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button variant="outline" className="w-full">In Thẻ Bệnh Nhân</Button>
        </div>
      </CardContent>
    </Card>
  )
}