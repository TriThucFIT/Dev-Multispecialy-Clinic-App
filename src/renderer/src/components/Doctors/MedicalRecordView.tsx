import { format } from 'date-fns'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { useState } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { currentPatientState, medicalRecordSelector } from './stores'
import { Table } from 'antd'

const prescriptionTableColumns = [
  {
    title: 'Tên thuốc',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Hàm lượng',
    dataIndex: 'dosage',
    key: 'dosage'
  },
  {
    title: 'ĐVT',
    dataIndex: 'unitStock',
    key: 'unitStock'
  },
  {
    title: 'Cách dùng',
    dataIndex: 'usage',
    key: 'usage'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    editable: true,
    width: 20
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
    editable: true
  }
]

export default function MedicalRecordView() {
  const [open, setOpen] = useState(false)
  const medicalRecord = useRecoilValueLoadable(medicalRecordSelector)
  const currentPatient = useRecoilValue(currentPatientState)

  if (medicalRecord.state === 'hasValue' && !medicalRecord.contents) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Không có thông tin bệnh án cho bệnh nhân này.</p>
      </div>
    )
  } else if (medicalRecord.state === 'loading') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loading loading-bars loading-lg text-primary" />
      </div>
    )
  } else if (medicalRecord.state === 'hasValue' && medicalRecord.contents) {
    return (
      <div className="bg-opacity-50">
        {medicalRecord.contents.entries && medicalRecord.contents.entries.length > 0 ? (
          medicalRecord.contents.entries
            .filter((entry) => entry.id != currentPatient?.currentRecord?.id)
            .map((entry) => (
              <Card key={entry.id} className="mt-4">
                <Collapsible
                  key={entry.id}
                  className="mt-2"
                  open={open}
                  onOpenChange={() => setOpen(!open)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="">
                      <CardTitle className="text-lg">
                        Lần khám ngày: {format(new Date(entry.visitDate), 'dd/MM/yyyy')}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        Bác sĩ: {entry.doctor?.fullName}
                      </div>
                      {!open && (
                        <div>
                          <h4 className="font-semibold mb-2">Chẩn đoán</h4>
                          <p>{entry.diagnosis || 'Không có thông tin'}</p>
                          <div className="flex mt-3 justify-end items-center">
                            <span className="text-muted-foreground mr-2">Xem chi tiết</span>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Triệu chứng</h4>
                        <p>{entry.symptoms || 'Không có thông tin'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Chẩn đoán</h4>
                        <p>{entry.diagnosis || 'Không có thông tin'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Kế hoạch điều trị</h4>
                        <p>{entry.treatmentPlan || 'Không có thông tin'}</p>
                      </div>
                      {entry.prescriptions &&
                        entry.prescriptions.length > 0 &&
                        entry.prescriptions.map((prescription) => {
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
                      {entry.labRequests && entry.labRequests.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Kết quả xét nghiệm</h4>
                          {entry.labRequests.map((lab: any, labIndex: number) => (
                            <Collapsible key={labIndex} className="mt-2">
                              <CollapsibleTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                  <span>{lab.labTest.name}</span>
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <Card className="mt-2">
                                  <CardHeader>
                                    <div className="flex items-center justify-between">
                                      <Badge
                                        variant={lab.status === 'pending' ? 'secondary' : 'default'}
                                      >
                                        {lab.status === 'pending' ? 'Đang chờ' : 'Hoàn thành'}
                                      </Badge>
                                      <span className="text-sm text-muted-foreground">
                                        {format(new Date(lab.requestDate), 'dd/MM/yyyy')}
                                      </span>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    {lab.status === 'pending' ? (
                                      <p>Đang chờ kết quả xét nghiệm.</p>
                                    ) : lab.testResult ? (
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {lab.testResult.detail.map((detail: any, idx: number) => (
                                            <div key={idx} className="p-4 border rounded-lg">
                                              <h5 className="font-semibold">{detail.name}</h5>
                                              <div className="mt-2 space-y-1">
                                                <p>
                                                  Giá trị: {detail.value} {detail.unit}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                  Phạm vi: {detail.range}
                                                </p>
                                                <Badge
                                                  variant={
                                                    detail.status === 'Normal'
                                                      ? 'default'
                                                      : 'destructive'
                                                  }
                                                >
                                                  {detail.status}
                                                </Badge>
                                              </div>
                                            </div>
                                          ))}
                                        </div>

                                        {lab.testResult.images && (
                                          <div className="space-y-4">
                                            <h5 className="font-semibold">Hình ảnh kết quả</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                                              {lab.testResult.images.map(
                                                (image: any, idx: number) => (
                                                  <img
                                                    key={idx}
                                                    src={image}
                                                    alt={`Hình ảnh ${idx + 1}`}
                                                    className="w-48 h-48 object-cover rounded-lg shadow-lg"
                                                  />
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {lab.testResult.notes && (
                                          <div className="mt-4">
                                            <h5 className="font-semibold">Ghi chú</h5>
                                            <p className="mt-1">{lab.testResult.notes}</p>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <p>Không có dữ liệu kết quả xét nghiệm.</p>
                                    )}
                                  </CardContent>
                                </Card>
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      )}
                      {entry.note && (
                        <div>
                          <h4 className="font-semibold mb-2">Ghi chú</h4>
                          <p>{entry.note}</p>
                        </div>
                      )}
                    </CardContent>

                    {open && (
                      <div className="w-full flex mt-3 p-3 justify-end items-center">
                        <button
                          className=" btn btn-primary btn-outline"
                          onClick={() => setOpen(!open)}
                        >
                          <span className="mr-2">Ẩn bớt</span>
                          <ChevronUp className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>Không có thông tin bệnh án cho bệnh nhân này.</p>
          </div>
        )}
      </div>
    )
  } else if (medicalRecord.state === 'hasError') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">
          Đã xảy ra lỗi khi tải thông tin bệnh án. Vui lòng thử lại sau.
        </p>
      </div>
    )
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p>Không có thông tin bệnh nhân.</p>
    </div>
  )
}
