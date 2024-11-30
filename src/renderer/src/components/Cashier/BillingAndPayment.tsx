import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { IoPrintSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { Input, Select } from 'antd'
import { Edit2 } from 'iconsax-react'
import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import {
  activeBillState,
  billingListState,
  invoiceToPayState,
  IPayer,
  isPayingState,
  payerState,
  payingProcessState,
  PaymentMethod,
  PaymentMethodMapper,
  ServiceType,
  TableRowSelection
} from './stores'
import { InvoiceStatuMappper, InvoiceStatus } from './enums'
import dayjs from 'dayjs'

const columns: TableColumnsType<ServiceType> = [
  { title: 'STT', dataIndex: 'key' },
  {
    title: 'Dịch Vụ',
    dataIndex: 'serviceName'
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'statusPayment',
    render: (statusPayment: InvoiceStatus) => InvoiceStatuMappper[statusPayment]
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
  <div className={`grid grid-cols-2 lg:grid-cols-3`}>
    {data.map((item: any, index: number) => (
      <div key={index} className="col-span-1">
        <span className="font-semibold mr-1">{item.label}:</span>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
)

export function BillingAndPayment() {
  const [billInfo, setBillInfo] = useRecoilState(activeBillState)
  const [billList, setBillList] = useRecoilState(billingListState)
  const [payer, setPayer] = useRecoilState(payerState)
  const [inputPayer, setInputPayer] = useState<IPayer>({ fullName: '', phone: '' })
  const [selectedUserPayment, setSelectedUserPayment] = useState<string>('paitent')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const [invoiceToPay, setInvoiceToPay] = useRecoilState(invoiceToPayState)
  const payResult = useRecoilValueLoadable(payingProcessState)
  const setIsPaying = useSetRecoilState(isPayingState)

  useEffect(() => {
    if (payer) {
      setInvoiceToPay({
        ...invoiceToPay,
        payment_person_name: payer.fullName,
        payment_person_phone: payer.phone
      })
    }
    // return () => {
    //   setInputPayer(undefined)
    // }
  }, [payer])

  useEffect(() => {
    if (selectedUserPayment === 'patient') {
      setPayer({
        fullName: billInfo?.patient?.fullName,
        phone: billInfo?.patient?.phone
      })
    }
    return () => {
      setPayer(null)
    }
  }, [selectedUserPayment])

  useEffect(() => {
    if (payResult.state === 'hasValue' && payResult.contents?.statusCode === 200) {
      console.log('Success: ', payResult.contents)
      const billIndex = billList.findIndex((item) => item.id === billInfo?.id)
      setBillList((oldList) => {
        const new_list = oldList.map((item, index) =>
          index === billIndex
            ? {
                ...item,
                status: InvoiceStatus.PAID,
                items: item.items.map((service) =>
                  invoiceToPay?.items_to_pay?.includes(service.id)
                    ? { ...service, status: InvoiceStatus.PAID }
                    : service
                )
              }
            : item
        )
        const unprocessedData = new_list.filter((item) => item.status !== InvoiceStatus.PAID)
        ;(window.api as any).send('sync-unprocessed-data', {
          messages: unprocessedData,
          queue_name: 'casher_general'
        })
        return new_list
      })
      setBillInfo(billList[billIndex + 1] || null)
      setIsPaying(false)
      setSelectedRowKeys([])
      setInvoiceToPay(null)
      setPayer(null)
    } else if (payResult.state === 'hasError') {
      setIsPaying(false)
      console.log('payResult with Error: ', payResult.contents)
    } else {
      console.log('Loading')
    }
  }, [payResult.state])

  const onSelectChange = (newSelectedRowKeys: React.Key[], records: ServiceType[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    const totalPrice = newSelectedRowKeys.reduce((acc: number, cur) => {
      const service = billInfo?.items.find((item) => item.key === cur)
      return acc + (service?.price ?? 0)
    }, 0)
    setInvoiceToPay({
      ...invoiceToPay,
      items_to_pay: records.map((record) => record.id),
      total_paid: totalPrice
    })
  }

  const handleChangeSelectUserPayment = (value: string) => {
    setSelectedUserPayment(value)
  }

  const rowSelection: TableRowSelection<ServiceType> = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => onSelectChange(selectedRowKeys, selectedRows),
    getCheckboxProps: (record) => ({
      disabled: record.statusPayment !== InvoiceStatus.PENDING,
      style: record.statusPayment !== InvoiceStatus.PENDING ? { display: 'none' } : {}
    }),
    defaultSelectedRowKeys: billInfo?.items?.map((item) => item.key)
  }

  const handlePay = async () => {
    if (invoiceToPay && invoiceToPay.items_to_pay && invoiceToPay.payment_method) {
      setIsPaying(true)
    }
  }

  return (
    <Card className="col-span-2 bg-opacity-50 bg-white h-full">
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
          <div className="space-y-4 hidden lg:block">
            <GridRowInfo
              data={[
                { label: 'Mã Hóa Đơn', value: billInfo?.id || 'Chưa có thông tin' },
                {
                  label: 'Ngày khám',
                  value: billInfo?.date
                    ? dayjs(billInfo?.date).format('DD/MM/YYYY')
                    : 'Chưa có thông tin'
                },
                {
                  label: 'Trạng Thái Thanh Toán',
                  value: billInfo
                    ? billInfo?.status === InvoiceStatus.PAID
                      ? 'Đã Thanh Toán'
                      : 'Chưa Thanh Toán'
                    : 'Chưa có thông tin'
                }
              ]}
            />
            <GridRowInfo
              data={[
                { label: 'Mã Bệnh Nhân', value: billInfo?.patient?.id || 'Chưa có thông tin' },
                { label: 'Bệnh Nhân', value: billInfo?.patient?.fullName || 'Chưa có thông tin' },
                { label: 'Ngày Sinh', value: billInfo?.patient.dob || 'Chưa có thông tin' }
              ]}
            />
            <GridRowInfo
              data={[
                {
                  label: 'Địa Chỉ',
                  value: billInfo?.patient?.address
                    ? Object.values(billInfo.patient.address).join(', ')
                    : 'Chưa có thông tin'
                },
                { label: 'Số Điện Thoại', value: billInfo?.patient.phone || 'Chưa có thông tin' },
                {
                  label: 'Giới Tính',
                  value: billInfo?.patient
                    ? billInfo?.patient.gender
                      ? 'Nam'
                      : 'Nữ'
                    : 'Chưa có thông tin'
                }
              ]}
            />
          </div>
          <div className="space-y-4 block lg:hidden">
            <GridRowInfo
              data={[
                { label: 'Mã Hóa Đơn', value: billInfo?.id || 'Chưa có thông tin' },
                {
                  label: 'Ngày khám',
                  value: billInfo?.date
                    ? dayjs(billInfo?.date).format('DD/MM/YYYY')
                    : 'Chưa có thông tin'
                }
              ]}
            />
            <GridRowInfo
              data={[
                { label: 'Mã Bệnh Nhân', value: billInfo?.patient?.id || 'Chưa có thông tin' },
                {
                  label: 'Trạng Thái Thanh Toán',
                  value: billInfo
                    ? billInfo?.status === InvoiceStatus.PAID
                      ? 'Đã Thanh Toán'
                      : 'Chưa Thanh Toán'
                    : 'Chưa có thông tin'
                }
              ]}
            />
            <GridRowInfo
              data={[
                { label: 'Bệnh Nhân', value: billInfo?.patient?.fullName || 'Chưa có thông tin' },
                { label: 'Ngày Sinh', value: billInfo?.patient.dob || 'Chưa có thông tin' }
              ]}
            />
            <GridRowInfo
              data={[
                { label: 'Số Điện Thoại', value: billInfo?.patient.phone || 'Chưa có thông tin' },
                {
                  label: 'Giới Tính',
                  value: billInfo?.patient
                    ? billInfo?.patient.gender
                      ? 'Nam'
                      : 'Nữ'
                    : 'Chưa có thông tin'
                }
              ]}
            />
            <GridRowInfo
              data={[
                {
                  label: 'Địa Chỉ',
                  value: billInfo?.patient?.address
                    ? Object.values(billInfo.patient.address).join(', ')
                    : 'Chưa có thông tin'
                }
              ]}
            />
          </div>
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
                          required
                          onChange={(e) =>
                            setInputPayer((prev) => ({ ...prev, fullName: e.target.value }))
                          }
                          onKeyDown={(e) =>
                            e.key === 'Enter' &&
                            inputPayer &&
                            setPayer((prev) => ({
                              ...prev,
                              fullName: inputPayer.fullName,
                              phone: inputPayer.phone
                            }))
                          }
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
                          required
                          onChange={(e) =>
                            setInputPayer((prev) => ({ ...prev, phone: e.target.value }) as IPayer)
                          }
                          onKeyDown={(e) =>
                            e.key === 'Enter' &&
                            inputPayer &&
                            setPayer((prev) => ({
                              ...prev,
                              phone: inputPayer.phone,
                              fullName: inputPayer.fullName
                            }))
                          }
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
            dataSource={billInfo?.items?.map((item) => ({
              key: item.key,
              id: item.id,
              statusPayment: item.status,
              serviceName: item.name,
              price: item.price * (item.quantity || 1),
              unit: item.price,
              quantity: item.quantity || 1
            }))}
            pagination={false}
            footer={() => (
              <div className="flex justify-end gap-4">
                <div className="font-semibold">Tổng Tiền</div>
                <div>{invoiceToPay?.total_paid?.toLocaleString() || 0} VNĐ</div>
              </div>
            )}
          />
          <div className="flex gap-2 items-center">
            <Label>Phương Thức Thanh Toán</Label>
            <div className="flex-1 w-full">
              <Select
                defaultValue="cash"
                className="w-full"
                onChange={(value: string) =>
                  setInvoiceToPay({ ...invoiceToPay, payment_method: value as PaymentMethod })
                }
                options={Object.entries(PaymentMethodMapper).map(([key, value]) => ({
                  label: value,
                  value: key
                }))}
              />
            </div>
          </div>
          <Button
            disabled={billInfo?.status !== InvoiceStatus.PENDING}
            onClick={handlePay}
            className="w-full"
          >
            {billInfo?.status === InvoiceStatus.PAID ? (
              'Các dịch vụ đã được thanh toán'
            ) : payResult.state === 'loading' ? (
              <span className="loading loading-spinner text-white" />
            ) : (
              'Thanh Toán'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
