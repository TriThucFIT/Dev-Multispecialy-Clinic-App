import { Button } from '../ui/button'
import { Label } from '../ui/label'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { IoPrintSharp } from 'react-icons/io5'
import { useState } from 'react'
import { Input, Select } from 'antd'
import { TfiMarkerAlt } from 'react-icons/tfi'

const billInfo = {
  invoiceId: 1,
  time: '13:24 12/12/2024',
  statusPayment: false,
  totalPayment: '800,000',
  patient: {
    patientId: 1,
    fullName: 'Trần Thị Yến Nhi',
    dob: '12/12/1999',
    gender: false,
    address: '123 Đường 123, Quận 1, TP.HCM',
    phone: '0123456789'
  },
  casher: {
    cashierId: 1,
    fullName: 'Nguyễn Văn A'
  },
  payer: {
    fullName: 'Nguyễn Văn B',
    phone: '0123456789'
  },
  service: [
    {
      serviceName: 'Khám Bệnh',
      price: '500,000',
      quantity: '1',
      statusPayment: false
    },
    {
      serviceName: 'Xét Nghiệm',
      price: '300,000',
      quantity: '1',
      statusPayment: false
    }
  ]
}

const GridRowInfo = ({ data }) => (
  <div className={`grid grid-cols-3`}>
    {data.map((item: any, index: number) => (
      <div key={index} className="col-span-1">
        <span className="font-semibold mr-1">{item.label}:</span>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
)
interface IPayer {
  fullName?: string
  phone?: string
}
export function BillingAndPayment() {
  const [payer, setPayer] = useState<IPayer>()
  const [inputPayer, setInputPayer] = useState<IPayer>()
  const [selectedUserPayment, setSelectedUserPayment] = useState<string>('paitent')

  const handleChangeSelectUserPayment = (value: string) => {
    setSelectedUserPayment(value)
  }

  return (
    <Card className="col-span-2 bg-opacity-90 bg-white">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Thanh Toán Hóa Đơn</CardTitle>
          <Button variant="ghost" className="w-32">
            <div className="flex gap-2">
              <span>
                <IoPrintSharp className="text-primary-600 text-lg" />
              </span>
              <span> In Hóa Đơn</span>
            </div>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <GridRowInfo
            data={[
              { label: 'Mã Hóa Đơn', value: billInfo.invoiceId },
              { label: 'Ngày khám', value: billInfo.time },
              {
                label: 'Trạng Thái Thanh Toán',
                value: billInfo.statusPayment ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'
              }
            ]}
          />
          <GridRowInfo
            data={[
              { label: 'Mã Thu Ngân', value: billInfo.casher.cashierId },
              { label: 'Thu Ngân', value: billInfo.casher.fullName }
            ]}
          />
          <GridRowInfo
            data={[
              { label: 'Mã Bệnh Nhân', value: billInfo.patient.patientId },
              { label: 'Bệnh Nhân', value: billInfo.patient.fullName },
              { label: 'Ngày Sinh', value: billInfo.patient.dob }
            ]}
          />
          <GridRowInfo
            data={[
              { label: 'Địa Chỉ', value: billInfo.patient.address },
              { label: 'Số Điện Thoại', value: billInfo.patient.phone },
              { label: 'Giới Tính', value: billInfo.patient.gender ? 'Nam' : 'Nữ' }
            ]}
          />
          <div className="grid grid-cols-3 items-center gap-2">
            <div className="font-semibold mr-1">Người Thanh Toán:</div>
            <Select
              defaultValue="patient"
              onChange={handleChangeSelectUserPayment}
              options={[
                { label: 'Bệnh Nhân', value: 'patient' },
                { label: 'Khác', value: 'other' }
              ]}
            />
          </div>

          {
            {
              patient: null,
              other: (
                <>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className="font-semibold mr-1">Họ Tên Người Thanh Toán:</div>
                    <div>
                      {payer?.fullName ? (
                        <span>{payer.fullName}</span>
                      ) : (
                        <Input
                          value={inputPayer?.fullName}
                          onChange={(e) =>
                            setInputPayer((prev) => ({ ...prev, fullName: e.target.value }))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && setPayer(inputPayer)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className="font-semibold mr-1">Số Điện Thoại Người Thanh Toán:</div>
                    <div>
                      {payer?.phone ? (
                        <span>{payer.phone}</span>
                      ) : (
                        <Input
                          value={inputPayer?.phone}
                          onChange={(e) =>
                            setInputPayer((prev) => ({ ...prev, phone: e.target.value }) as IPayer)
                          }
                          onKeyDown={(e) => e.key === 'Enter' && setPayer(inputPayer)}
                        />
                      )}
                    </div>
                  </div>
                </>
              )
            }[selectedUserPayment]
          }
        </div>
      </CardContent>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Dịch Vụ</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Đơn giá</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billInfo.service.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{service.serviceName}</TableCell>
                  <TableCell>{service.quantity}</TableCell>
                  <TableCell>
                    {service.statusPayment ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
                  </TableCell>
                  <TableCell>{service.price} VNĐ</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="text-right font-semibold">
                  Tổng Tiền
                </TableCell>
                <TableCell>{billInfo.totalPayment} VNĐ</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="flex gap-2 items-center">
            <Label>Phương Thức Thanh Toán</Label>
            <div className="flex-1 w-full">
              <Select
                defaultValue="cash"
                className="w-full"
                onChange={handleChangeSelectUserPayment}
                options={[
                  { label: 'Tiền Mặt', value: 'cash' },
                  { label: 'Thẻ Tín Dụng/Ghi Nợ', value: 'card' },
                  { label: 'Bảo Hiểm', value: 'insurance' }
                ]}
              />
            </div>
          </div>
          <Button className="w-full">Thanh Toán</Button>
        </div>
      </CardContent>
    </Card>
  )
}
