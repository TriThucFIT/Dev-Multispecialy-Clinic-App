import Search, { SearchProps } from 'antd/es/input/Search'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
// import { FaFileCirclePlus } from 'react-icons/fa6'
// import { Button } from 'antd'
import { CreatePrescription } from './CreatePrescription'
import { createPrescription, PrescriptionQueue } from '@renderer/utils/PriorityQueueCustomize'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import {
  currentPrescriptionState,
  prescriptionListState,
  PrescriptionSendToQueue,
  PrescriptionStatus,
  updatePrescriptionStatus
} from './store'
import { PrescriptionStatusRender } from './PrescriptionStatus'

export const PrescriptionList = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const pQueue = PrescriptionQueue
  const [prescriptionList, setPrescriptionList] =
    useRecoilState<PrescriptionSendToQueue[]>(prescriptionListState)
  const [currentPrescription, setCurrentPrescription] =
    useRecoilState<PrescriptionSendToQueue | null>(currentPrescriptionState)

  const updateresult = useRecoilValueLoadable(updatePrescriptionStatus)

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  useEffect(() => {
    ;(window.api as any).onPrescription((message: any) => {
      const prescription = createPrescription(JSON.parse(message))
      pQueue.enqueue(prescription)
      setPrescriptionList(pQueue.toArray())
    })
  }, [])

  useEffect(() => {
    console.log('prescriptionList', prescriptionList);
    
    if (prescriptionList.length > 0 && !currentPrescription) {
      const prescription = pQueue.dequeue()
      setCurrentPrescription({ ...prescription, status: PrescriptionStatus.IN_PROGRESS })
      setPrescriptionList(pQueue.toArray())
    }
  }, [prescriptionList, currentPrescription])

  useEffect(() => {
    console.log('updateresult', updateresult);
    
    if (updateresult.state === 'hasValue' && updateresult.contents) {
      setCurrentPrescription(null)
    }
  }, [updateresult.state])

  return (
    <>
      <Card className="bg-opacity-50 bg-white h-full">
        <CardHeader>
          <CardTitle>Danh sách Đơn Thuốc</CardTitle>
        </CardHeader>
        {/* <div className="px-6 mb-2 flex justify-end">
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            <FaFileCirclePlus />
            Tạo đơn thuốc mới
          </Button>
        </div> */}
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
                {/* <TableHead>Thời gian</TableHead> */}
                <TableHead>Trạng Thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPrescription && (
                <TableRow className="bg-bgActive" key={currentPrescription.medicalRecordEntryId}>
                  <TableCell>{currentPrescription.medicalRecordEntryId}</TableCell>
                  <TableCell>{currentPrescription.patient.id}</TableCell>
                  <TableCell className="flex-wrap text-wrap">
                    {currentPrescription.patient.name}
                  </TableCell>
                  {/* <TableCell>{currentPrescription.status}</TableCell> */}
                  <TableCell>
                    <PrescriptionStatusRender statusPresciption={currentPrescription.status} />
                  </TableCell>
                </TableRow>
              )}
              {prescriptionList.map((prescription, index) => (
                <TableRow
                  key={index}
                  className={clsx({
                    'bg-bgActive':
                      currentPrescription?.medicalRecordEntryId ===
                      prescription.medicalRecordEntryId
                  })}
                >
                  <TableCell>{prescription.medicalRecordEntryId}</TableCell>
                  <TableCell>{prescription?.patient?.id}</TableCell>
                  <TableCell className="flex-wrap text-wrap">
                    {prescription?.patient?.name}
                  </TableCell>
                  {/* <TableCell>{prescription.status}</TableCell> */}
                  <TableCell>
                    <PrescriptionStatusRender statusPresciption={prescription.status} />
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
