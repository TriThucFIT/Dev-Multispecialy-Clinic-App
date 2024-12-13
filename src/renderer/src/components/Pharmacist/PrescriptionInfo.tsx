import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import {
  currentPrescriptionState,
  isUpdatePrescriptionStatus,
  medicalRecordEntrySelector,
  updatePrescriptionStatus
} from './store'
import { Table } from 'antd'
import { prescriptionTableColumns } from '../Doctors/MedicalRecordView'
import { useEffect } from 'react'
import { usePopup } from '@renderer/hooks/usePopup'

export const PrescriptionInfo = () => {
  const prescription = useRecoilValueLoadable(medicalRecordEntrySelector)
  const currentPrescription = useRecoilValue(currentPrescriptionState)
  const setIsUpdate = useSetRecoilState(isUpdatePrescriptionStatus)
  const updateresult = useRecoilValueLoadable(updatePrescriptionStatus)

  useEffect(() => {
    if (updateresult.state === 'hasValue' && currentPrescription) {
      setIsUpdate(false)
      if (updateresult.contents) {
        usePopup('Đã hoàn thành đơn thuốc', 'success')
        ;(window.api as any).syncUnprocessedData({
          message_id: currentPrescription.medicalRecordEntryId,
          queue_name: 'pharmacist_general',
          type: 'prescriptions'
        })
      } else usePopup('Đã có lỗi xảy ra', 'error')
    } else if (updateresult.state === 'hasError') {
      setIsUpdate(false)
      usePopup('Đã có lỗi xảy ra', 'error')
    }
  }, [updateresult.state])
  return (
    <Card className="col-span-2 bg-opacity-50 bg-white h-full min-h-[80vh]">
      <CardHeader>
        <CardTitle>Xử lý đơn thuốc</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <span className="font-semibold mr-1">Mã Đơn Thuốc:</span>
              <span>
                {prescription.state === 'hasValue' && prescription.contents
                  ? prescription.contents.id
                  : ''}
              </span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Thời gian Kê Đơn:</span>
              <span>
                {prescription.state === 'hasValue' && prescription.contents
                  ? prescription.contents.visitDate
                    ? new Date(prescription.contents.visitDate).toLocaleString()
                    : ''
                  : ''}
              </span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Mã Bệnh Nhân:</span>
              <span>{currentPrescription?.patient.id}</span>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <span className="font-semibold mr-1">Bác Sĩ Kê Đơn:</span>
              <span>{currentPrescription?.doctor}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Trạng Thái:</span>
              <span>{currentPrescription?.status}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold mr-1">Tên Bệnh Nhân:</span>
              <span>{currentPrescription?.patient?.name}</span>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <span className="font-semibold mr-1">Ghi chú của bác sĩ:</span>
              <span className="italic">{currentPrescription?.note}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="space-y-4 w-full h-full">
          {prescription.state === 'loading' && (
            <div className="loading loading-spinner loading-lg text-primary" />
          )}
          {prescription.state === 'hasError' && (
            <div className="text-red-500">Đã có lỗi xảy ra</div>
          )}
          {prescription.state === 'hasValue' &&
            prescription.contents &&
            prescription.contents.prescriptions &&
            prescription.contents.prescriptions.length > 0 &&
            prescription.contents.prescriptions.map((prescription) => {
              return (
                <div>
                  <h4 className="font-semibold mb-2">Đơn thuốc</h4>
                  <Table
                    columns={prescriptionTableColumns}
                    dataSource={prescription.medications.map((med) => ({
                      ...med.medication,
                      quantity: med.quantity,
                      note: med.note
                    }))}
                    pagination={false}
                    rowKey="id"
                  />
                </div>
              )
            })}
          <Button onClick={() => setIsUpdate(true)} className="w-full">
            {updateresult.state === 'loading' ? (
              <div className="loading" />
            ) : (
              'Hoàn Thành Đơn Thuốc'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
