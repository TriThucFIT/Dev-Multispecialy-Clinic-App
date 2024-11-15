import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
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
  height: number
  weight: number
}

type CurrentPatientDetailsProps = {
  patient: Patient | null
  allergies: Allergy[]
  vitalSigns: VitalSigns
}

const RowGrid = ({ label, value }: { label: string; value: string | number }) => (
  <div className="col-span-1">
    <div className="flex gap-2">
      <div className="font-semibold">{label}</div>
      <div>{value}</div>
    </div>
  </div>
)

export function CurrentPatientDetails({
  patient,
  allergies,
  vitalSigns
}: CurrentPatientDetailsProps) {
  const RowHealthIndicator = (props: { label: string; value: any; unit?: string }) => (
    <div>
      <span>{props.label}: </span>
      {props.value ? (
        <span>
          {props.value}
          {props.unit}
        </span>
      ) : (
        <span className="italic text-gray-500">Chưa khám</span>
      )}
    </div>
  )

  return (
    <Card className="bg-opacity-50 bg-white">
      <CardHeader>
        <div className="grid grid-cols-3">
          <CardTitle>Bệnh nhân hiện tại: {patient?.fullName}</CardTitle>
          <RowGrid label="Tuổi" value={patient?.age?.toString() || 'Chưa có bệnh nhân'} />
          <RowGrid
            label="Giới tính"
            value={typeof patient?.gender === 'string' ? patient.gender : 'Chưa có bệnh nhân'}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
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
              {/* {patient ? ( */}
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
              {/* ) : (
                <span className="italic text-gray-500">Chưa có bệnh nhân</span>
              )} */}
            </div>
          </div>
          <div className="col-span-2 ">
            <Label>Chỉ số sức khỏe :</Label>
            <div className="border rounded-md p-5">
              {/* {patient ? ( */}
              <div className="grid grid-cols-3 gap-2 ">
                <RowHealthIndicator label="Huyết áp" value={vitalSigns.bloodPressure} />
                <RowHealthIndicator label="Nhịp tim" value={vitalSigns.heartRate} />
                <RowHealthIndicator label="Chiều cao" value={vitalSigns.height} unit="m" />
                <RowHealthIndicator
                  label="Độ bão hòa O2"
                  value={vitalSigns.oxygenSaturation}
                  unit="%"
                />
                <RowHealthIndicator label="Nhiệt độ" value={vitalSigns.temperature} unit="°C" />
                <RowHealthIndicator label="Cân nặng" value={vitalSigns.weight} unit="kg" />
              </div>
              {/* ) : (
                <span className="italic text-gray-500">Chưa có bệnh nhân</span>
              )} */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
