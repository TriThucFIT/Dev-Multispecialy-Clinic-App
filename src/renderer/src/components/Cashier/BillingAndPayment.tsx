import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { IoPrintSharp } from 'react-icons/io5'
import { useState } from 'react'
import { Input, Select } from 'antd'
import { Edit2 } from 'iconsax-react'
import { Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

const billInfo = {
  invoiceId: 1,
  time: '13:24 12/12/2024',
  statusPayment: false,
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
      key: 1,
      serviceName: 'Khám Bệnh',
      price: 500000,
      // quantity: '1',
      statusPayment: true
    },
    {
      key: 2,
      serviceName: 'Xét Nghiệm',
      price: 300000,
      // quantity: '1',
      statusPayment: false
    },
    {
      key: 3,
      serviceName: 'Acetylcystein (uống)',
      unit: 100000,
      price: 200000,
      quantity: '2',
      dvt: 'Lọ',
      statusPayment: false
    }
  ]
}

interface IPayer {
  fullName?: string
  phone?: string
}

interface ServiceType {
  key: React.Key
  serviceName: string
  unit?: number
  price: number
  quantity?: string
  dvt?: string
  statusPayment: boolean
}

const columns: TableColumnsType<ServiceType> = [
  { title: 'STT', dataIndex: 'key' },
  {
    title: 'Dịch Vụ',
    dataIndex: 'serviceName'
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'statusPayment',
    render: (statusPayment: boolean) => (statusPayment ? 'Đã Thanh Toán' : 'Chưa Thanh Toán')
  },
  {
    title: 'ĐVT',
    dataIndex: 'dvt'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity'
  },
  {
    title: 'Đơn Giá',
    dataIndex: 'unit',
    render: (unit: string) => <div>{unit?.toLocaleString()}</div>
  },
  {
    title: <div className="flex items-center justify-end">Thành Tiền</div>,
    dataIndex: 'price',
    render: (price: string) => (
      <div className="flex items-center justify-end gap-1">
        <span>{price.toLocaleString()}</span>
      </div>
    )
  }
]

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

export function BillingAndPayment() {
  const [payer, setPayer] = useState<IPayer>()
  const [inputPayer, setInputPayer] = useState<IPayer>()
  const [selectedUserPayment, setSelectedUserPayment] = useState<string>('paitent')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [totalPayment, setTotalPayment] = useState<number>(0)

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    const totalPrice = newSelectedRowKeys.reduce((acc: number, cur) => {
      const service = billInfo.service.find((item) => item.key === cur)
      return acc + (service?.price ?? 0)
    }, 0)
    setTotalPayment(totalPrice)
  }

  const handleChangeSelectUserPayment = (value: string) => {
    setSelectedUserPayment(value)
  }

  const rowSelection: TableRowSelection<ServiceType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.statusPayment,
      style: record.statusPayment ? { display: 'none' } : {}
    })
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
                        <div className="flex items-center gap-4">
                          <div className="flex flex-1">{payer.fullName}</div>
                          <div
                            className="bg-secondary-100 rounded-full size-8 flex items-center justify-center"
                            onClick={() => setPayer((prev) => ({ ...prev, fullName: '' }))}
                          >
                            <Edit2 size="18" variant="Bold" className="text-secondary-600" />
                          </div>
                        </div>
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
                        <div className="flex items-center gap-4">
                          <div className="flex flex-1">{payer.phone}</div>
                          <div
                            className="bg-secondary-100 rounded-full size-8 flex items-center justify-center"
                            onClick={() => setPayer((prev) => ({ ...prev, phone: '' }))}
                          >
                            <Edit2 size="18" variant="Bold" className="text-secondary-600" />
                          </div>
                        </div>
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
          <Table<ServiceType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={billInfo.service}
            pagination={false}
            footer={() => (
              <div className="flex justify-end gap-4">
                <div className="font-semibold">Tổng Tiền</div>
                <div>{totalPayment.toLocaleString()} VNĐ</div>
              </div>
            )}
          />
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
