import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Patient } from '@renderer/types/Patient/patient'

type Allergy = {
  id: number
  name: string
  severity: 'Nhẹ' | 'Vừa' | 'Nặng'
}

type VitalSigns = {
  bloodPressure: string
  heartRate: number
  temperature: number
  oxygenSaturation: number
}

type CurrentPatientDetailsProps = {
  patient: Patient | null
  allergies: Allergy[]
  vitalSigns: VitalSigns
}

export function CurrentPatientDetails({
  patient,
  allergies,
  vitalSigns
}: CurrentPatientDetailsProps) {
  return (
    <Card className="md:col-span-2 bg-opacity-90 bg-white">
      <CardHeader>
        <CardTitle>Bệnh nhân hiện tại: {patient?.fullName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Tuổi</Label>
            <Input
              disabled={patient === null}
              value={patient?.age?.toString() || 'Chưa có bệnh nhân'}
              readOnly
            />
          </div>
          <div>
            <Label>Giới tính</Label>
            <Input
              disabled={patient === null}
              value={patient?.gender || 'Chưa có bệnh nhân'}
              readOnly
            />
          </div>
          <div className="col-span-2">
            <Label>Triệu chứng</Label>
            <Textarea
              disabled={patient === null}
              value={patient?.symptoms || 'Chưa có bệnh nhân'}
              readOnly
            />
          </div>
          <div className="col-span-2 ">
            <Label>Dị ứng : </Label>
            <div className="border rounded-md p-5">
              {patient ? (
                <ul className="list-none">
                  {allergies.length > 0 ? (
                    allergies.map((allergy) => (
                      <li key={allergy.id}>
                        {allergy.name} - {allergy.severity}
                      </li>
                    ))
                  ) : (
                    <span className="italic text-gray-500">Không có dị ứng</span>
                  )}
                </ul>
              ) : (
                <span className="italic text-gray-500">Chưa có bệnh nhân</span>
              )}
            </div>
          </div>
          <div className="col-span-2 ">
            <Label>Chỉ số sức khỏe :</Label>
            <div className="border rounded-md p-5">
              {patient ? (
                <div className="grid grid-cols-2 gap-2 ">
                  <div>
                    <span>Huyết áp: </span>
                    {vitalSigns.bloodPressure ? (
                      <span>{vitalSigns.bloodPressure}</span>
                    ) : (
                      <span className="italic text-gray-500">Chưa khám</span>
                    )}
                  </div>
                  <div>
                    <span>Nhịp tim: </span>
                    {vitalSigns.heartRate ? (
                      <span>{vitalSigns.heartRate}</span>
                    ) : (
                      <span className="italic text-gray-500">Chưa khám</span>
                    )}
                  </div>
                  <div>
                    <span>Nhiệt độ: </span>
                    {vitalSigns.temperature ? (
                      <span>{vitalSigns.temperature}°C</span>
                    ) : (
                      <span className="italic text-gray-500">Chưa khám</span>
                    )}
                  </div>
                  <div>
                    <span>Độ bão hòa O2: </span>
                    {vitalSigns.oxygenSaturation ? (
                      <span>{vitalSigns.oxygenSaturation}%</span>
                    ) : (
                      <span className="italic text-gray-500">Chưa khám</span>
                    )}
                  </div>
                </div>
              ) : (
                <span className="italic text-gray-500">Chưa có bệnh nhân</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
