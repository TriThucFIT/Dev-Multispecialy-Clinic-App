import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'

export const PrescriptionInfo = () => {
  return (
    <Card className="col-span-2 bg-opacity-90 bg-white">
      <CardHeader>
        <CardTitle>Xử lý đơn thuốc</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <span className="font-semibold mr-1">Mã Đơn Thuốc:</span>
              <span>1</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Thời gian Kê Đơn:</span>
              <span>28-09-2024</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Mã Bệnh Nhân:</span>
              <span>1</span>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <span className="font-semibold mr-1">Bác Sĩ Kê Đơn:</span>
              <span>Trần Thị Yến Nhi</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Trạng Thái:</span>
              <span>Mới</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Tên Bệnh Nhân:</span>
              <span>Trần Minh Thuận</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã Đơn Thuốc</TableHead>
                <TableHead>Tên Thuốc</TableHead>
                <TableHead>Liều lượng</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Ghi chú của bác sĩ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Sổ mũi</TableCell>
                <TableCell>2</TableCell>
                <TableCell>20</TableCell>
                <TableCell>Không</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Đau lưng</TableCell>
                <TableCell>3</TableCell>
                <TableCell>50</TableCell>
                <TableCell>Không</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="w-full">Hoàn thành</Button>
        </div>
      </CardContent>
    </Card>
  )
}
