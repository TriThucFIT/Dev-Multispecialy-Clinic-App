import Search, { SearchProps } from 'antd/es/input/Search'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import clsx from 'clsx'
import { useState } from 'react'
import { PrescriptionStatus } from './PrescriptionStatus'
import { ePrescriptionStatus } from '@renderer/types/Prescription'
import { FaFileCirclePlus } from 'react-icons/fa6'
import { Button } from 'antd'
import { CreatePrescription } from './CreatePrescription'

const prescriptionList = [
  {
    id: 1,
    name: 'Trần Minh Thuận',
    time: '12/12/2024',
    statusPayment: ePrescriptionStatus.new
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    time: '12/12/2024',
    statusPayment: ePrescriptionStatus.new
  },
  {
    id: 3,
    name: 'Nguyễn Văn C',
    time: '12/12/2024',
    statusPayment: ePrescriptionStatus.new
  },
  {
    id: 4,
    name: 'Nguyễn Văn D',
    time: '12/12/2024',
    statusPayment: ePrescriptionStatus.processing
  }
]

export const PrescriptionList = () => {
  const [prescriptionActive, setPrescriptionActive] = useState<number | null>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  return (
    <Card className="bg-opacity-90 bg-white">
      <CardHeader>
        <CardTitle>Danh sách Đơn Thuốc</CardTitle>
      </CardHeader>
      <div className="px-6 mb-2 flex justify-end">
        <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
          <FaFileCirclePlus />
          Tạo đơn thuốc mới
        </Button>
      </div>
      <div className="px-6 mb-2">
        <Search placeholder="Số điện thoại hoặc Tên" onSearch={onSearch} />
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Tên bệnh nhân</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Trạng Thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptionList.map((prescription) => (
              <TableRow
                key={prescription.id}
                className={clsx({ 'bg-bgActive': prescriptionActive === prescription.id })}
                onClick={() => setPrescriptionActive(prescription.id)}
              >
                <TableCell>{prescription.id}</TableCell>
                <TableCell>{prescription.name}</TableCell>
                <TableCell>{prescription.time}</TableCell>
                <TableCell>
                  <PrescriptionStatus statusPayment={prescription.statusPayment} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CreatePrescription isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Card>
  )
}
