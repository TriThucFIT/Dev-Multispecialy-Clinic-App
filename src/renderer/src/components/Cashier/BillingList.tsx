import { GetProps, Input, Select } from 'antd'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosCloseCircle } from 'react-icons/io'
import { TbFilterSearch } from 'react-icons/tb'
import { useState } from 'react'
import clsx from 'clsx'
import Search from 'antd/es/input/Search'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

type SearchProps = GetProps<typeof Input.Search>

const patientList = [
  { id: 1, name: 'Nguyễn Văn A', time: '12/12/2024', statusPayment: false },
  {
    id: 2,
    name: 'Nguyễn Văn B',
    time: '12/12/2024',
    statusPayment: false
  },

  {
    id: 3,
    name: 'Nguyễn Văn C',
    time: '12/12/2024',
    statusPayment: false
  },
  {
    id: 4,
    name: 'Nguyễn Văn D',
    time: '12/12/2024',
    statusPayment: true
  }
]

const filterStatus = [
  { value: 'all', label: 'Tất cả' },
  { value: 'unpaid', label: 'Chưa thanh toán' },
  { value: 'paid', label: 'Đã thanh toán' }
]

export function BillingList() {
  const [patientActive, setPatientActive] = useState<number | null>(1)
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
        <Select
          defaultValue={filterStatus[0].value}
          options={filterStatus}
          suffixIcon={<TbFilterSearch size={16} color="white" />}
        />
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên bệnh nhân</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Trạng Thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patientList.map((patient) => (
              <TableRow
                key={patient.id}
                className={clsx({ 'bg-bgActive': patientActive === patient.id })}
                onClick={() => setPatientActive(patient.id)}
              >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.time}</TableCell>
                <TableCell>
                  <span className="col-span-1 flex items-center justify-self-end">
                    {patient.statusPayment ? (
                      <FaCircleCheck color="var(--success)" />
                    ) : (
                      <IoIosCloseCircle color="var(--error)" />
                    )}
                    <span className="text-blueSecondary font-semibold text-end ml-2 cursor-pointer">
                      Chi tiết
                    </span>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
