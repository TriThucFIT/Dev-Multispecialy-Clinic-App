import { ConfigProvider, GetProps, Input, Select } from 'antd'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosCloseCircle } from 'react-icons/io'
import { TbFilterSearch } from 'react-icons/tb'
import { useState } from 'react'
import clsx from 'clsx'
import Search from 'antd/es/input/Search'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

type SearchProps = GetProps<typeof Input.Search>

const billList = [
  {
    invoiceId: "IV0125",
    patient: {
      patientId: "PA0185",
      fullName: 'Trần Thị Ngọc Yến Nhi ',
      dob: '12/12/1999'
    },
    time: '13:24 12/12/2024',
    statusPayment: false
  },
  {
    invoiceId: "IV0126",
    patient: {
      patientId: 2,
      fullName: 'Võ Thị Hồng Nhung',
      dob: '12/12/1999'
    },
    time: '13:24 12/12/2024',
    statusPayment: false
  },

  {
    invoiceId: "IV0127",
    patient: {
      patientId: 3,
      fullName: 'Nguyễn Văn C',
      dob: '12/12/1999'
    },
    time: '13:24 12/12/2024',
    statusPayment: false
  },
  {
    invoiceId: "IV0128",
    patient: {
      patientId: 4,
      fullName: 'Nguyễn Văn D',
      dob: '12/12/1999'
    },
    time: '13:24 12/12/2024',
    statusPayment: true
  }
]

const filterStatus = [
  { value: 'all', label: 'Tất cả' },
  { value: 'unpaid', label: 'Chưa thanh toán' },
  { value: 'paid', label: 'Đã thanh toán' }
]

export function BillingList() {
  const [billActive, setBillActive] = useState<string | null>("IV0125")
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  return (
    <Card className="bg-opacity-90 bg-white">
      <CardHeader>
        <CardTitle>Danh sách Hóa Đơn</CardTitle>
      </CardHeader>
      <div className="px-6 mb-2">
        <Search placeholder="Số điện thoại hoặc Tên" onSearch={onSearch} />
      </div>
      <div className="flex justify-end mr-6 mb-2">
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorBgContainer: 'var(--primary-200)'
              }
            }
          }}
        >
          <Select
            defaultValue={filterStatus[0].value}
            options={filterStatus}
            suffixIcon={<TbFilterSearch size={14} className="text-primary-600" />}
          />
        </ConfigProvider>
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Mã Hóa Đơn</TableHead>
              <TableHead>Mã bệnh nhân</TableHead>
              <TableHead>Tên bệnh nhân</TableHead>
              <TableHead>Ngày sinh</TableHead>
              <TableHead>Ngày khám</TableHead>
              <TableHead>Trạng thái thu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billList.map((bill, index) => (
              <TableRow
                key={bill.invoiceId}
                className={clsx({ 'bg-bgActive': billActive === bill.invoiceId })}
                onClick={() => setBillActive(bill.invoiceId)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bill.invoiceId}</TableCell>
                <TableCell>{bill.patient.patientId}</TableCell>
                <TableCell>{bill.patient.fullName}</TableCell>
                <TableCell>{bill.patient.dob}</TableCell>
                <TableCell>{bill.time}</TableCell>
                <TableCell>
                  <div className="col-span-1 flex items-center justify-center">
                    {bill.statusPayment ? (
                      <FaCircleCheck color="var(--success)" />
                    ) : (
                      <IoIosCloseCircle color="var(--error)" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
