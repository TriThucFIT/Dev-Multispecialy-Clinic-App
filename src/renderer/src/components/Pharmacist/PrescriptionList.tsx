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
    patientId: 'PAT01',
    time: '13:27 12/12/2024',
    statusPayment: ePrescriptionStatus.new
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    patientId: 'PAT02',
    time: '13:28 12/12/2024',
    statusPayment: ePrescriptionStatus.new
  },
  {
    id: 3,
    name: 'Nguyễn Văn C',
    patientId: 'PAT03',
    time: '13:15 12/12/2024',
    statusPayment: ePrescriptionStatus.done
  },
  {
    id: 4,
    name: 'Nguyễn Văn D',
    patientId: 'PAT04',
    time: '13:20 12/12/2024',
    statusPayment: ePrescriptionStatus.processing
  },
  {
    id: 5,
    name: 'Nguyễn Văn E',
    patientId: 'PAT05',
    time: '13:25 12/12/2024',
    statusPayment: ePrescriptionStatus.done
  },
  {
    id: 6,
    name: 'Nguyễn Văn F',
    patientId: 'PAT06',
    time: '13:30 12/12/2024',
    statusPayment: ePrescriptionStatus.processing
  },
]

export const PrescriptionList = () => {
  const [prescriptionActive, setPrescriptionActive] = useState<number | null>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  return (
    <>
      <Card className="bg-opacity-90 bg-white max-h-[800px]">
        <CardHeader>
          <CardTitle>Danh sách Đơn Thuốc</CardTitle>
        </CardHeader>
        <div className="px-6 mb-2 flex justify-end">
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
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
                <TableHead>Mã bệnh nhân</TableHead>
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
                  <TableCell>{prescription.patientId}</TableCell>
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
      </Card>
      <CreatePrescription isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}
