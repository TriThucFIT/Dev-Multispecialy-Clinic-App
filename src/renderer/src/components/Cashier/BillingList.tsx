import { ConfigProvider, GetProps, Input, Select } from 'antd'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosCloseCircle } from 'react-icons/io'
import { TbFilterSearch } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Search from 'antd/es/input/Search'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useRecoilState } from 'recoil'
import { billingListState } from './stores'
import { InvoiceStatus } from './enums'

type SearchProps = GetProps<typeof Input.Search>

const filterStatus = [
  { value: 'all', label: 'Tất cả' },
  { value: 'unpaid', label: 'Chưa thanh toán' },
  { value: 'paid', label: 'Đã thanh toán' }
]

export function BillingList() {
  const [billList, setBillList] = useRecoilState(billingListState)
  const [billActive, setBillActive] = useState<number | null>(billList[0]?.id || null)
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  useEffect(() => {
    ;(window.api as any).onInvoice((message: any) => {
      console.log('received-invoice', JSON.parse(message))
      setBillList((oldList) => [...oldList, JSON.parse(message)])
    })
  }, [])
  return (
    <Card className="bg-opacity-90 bg-white overflow-auto">
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
            {billList.map((invoice, index) => (
              <TableRow
                key={invoice.id}
                className={clsx({ 'bg-bgActive': billActive === invoice.id })}
                onClick={() => setBillActive(invoice.id)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`INV-${invoice.id.toString().padStart(4, '0')}`}</TableCell>
                <TableCell>{invoice.patient.id}</TableCell>
                <TableCell>{invoice.patient.fullName}</TableCell>
                <TableCell>{invoice.patient.dob}</TableCell>
                <TableCell>{invoice.date.toLocaleString('vi-VN')}</TableCell>
                <TableCell>
                  <div className="col-span-1 flex items-center justify-center">
                    {invoice.status === InvoiceStatus.PAID ? (
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
