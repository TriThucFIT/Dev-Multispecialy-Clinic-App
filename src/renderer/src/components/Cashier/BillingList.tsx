import { ConfigProvider, GetProps, Input, Select } from 'antd'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosCloseCircle } from 'react-icons/io'
import { TbFilterSearch } from 'react-icons/tb'
import { useEffect } from 'react'
import clsx from 'clsx'
import Search from 'antd/es/input/Search'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  activeBillState,
  billingListState,
  InvoiceFormQueue,
  invoiceToPayState,
  PaymentMethod
} from './stores'
import { InvoiceStatus } from './enums'
import dayjs from 'dayjs'
import { UserState } from '@renderer/state'

type SearchProps = GetProps<typeof Input.Search>

const filterStatus = [
  { value: 'all', label: 'Tất cả' },
  { value: 'unpaid', label: 'Chưa thanh toán' },
  { value: 'paid', label: 'Đã thanh toán' }
]

export function BillingList() {
  const [billList, setBillList] = useRecoilState(billingListState)
  const userCurrent = useRecoilValue(UserState)
  const [billActive, setBillActive] = useRecoilState(activeBillState)
  const setInvoiceToPayState = useSetRecoilState(invoiceToPayState)
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  useEffect(() => {
    ;(window.api as any).onInvoice((message: any) => {
      console.log('received-invoice', JSON.parse(message))
      setBillList((oldList) => [...oldList, JSON.parse(message)])
    })
  }, [])

  useEffect(() => {
    if (billList.length > 0 && !billActive) {
      setBillActive(billList[0])
    }
  }, [billList])

  const handleInvoiceClick = (invoice: InvoiceFormQueue) => {
    setBillActive(invoice)
    setInvoiceToPayState({
      invoice_id: invoice.id,
      payment_date: invoice.date,
      payment_person_name: invoice.patient.fullName,
      payment_person_phone: invoice.patient.phone,
      items_to_pay: invoice.items.map((item) => item.id),
      payment_method: PaymentMethod.CASH,
      casher_username: userCurrent?.username,
      patient: invoice.patient
    })
  }
  return (
    <Card className="bg-opacity-50 bg-white h-full">
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
              <TableHead>Mã bệnh nhân</TableHead>
              <TableHead className="w-fit min-w-36">Tên bệnh nhân</TableHead>
              <TableHead>Ngày sinh</TableHead>
              <TableHead>Ngày khám</TableHead>
              <TableHead>Trạng thái thu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billList.map((invoice, index) => (
              <TableRow
                key={invoice.id}
                className={`${clsx({ 'bg-bgActive': billActive?.id === invoice.id })} cursor-pointer`}
                onClick={() => handleInvoiceClick(invoice)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{invoice.patient.id}</TableCell>
                <TableCell>{invoice.patient.fullName}</TableCell>
                <TableCell>{dayjs(invoice.patient.dob).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{dayjs(invoice.date).format('DD/MM/YYYY')}</TableCell>
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
